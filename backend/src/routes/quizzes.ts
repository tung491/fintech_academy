import express from 'express';
import prisma from '../db/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/:quizId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.user!.id;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        week: {
          select: {
            weekNumber: true,
            courseId: true
          }
        },
        questions: {
          select: {
            id: true,
            questionText: true,
            questionType: true,
            options: true,
            points: true,
            orderIndex: true
          },
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const userAttempts = await prisma.quizAttempt.aggregate({
      where: {
        userId,
        quizId
      },
      _count: true,
      _max: {
        score: true
      }
    });

    res.json({
      ...quiz,
      questions: quiz.questions,
      userStats: {
        attemptCount: userAttempts._count,
        bestScore: userAttempts._max.score
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

router.post('/:quizId/submit', authenticate, async (req: AuthRequest, res) => {
  try {
    const { quizId } = req.params;
    const { answers, timeTaken, practiceMode = false } = req.body;
    const userId = req.user!.id;

    console.log('Quiz submission attempt:', { quizId, userId, answers, timeTaken, practiceMode });

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const attemptCount = await prisma.quizAttempt.count({
      where: {
        userId,
        quizId
      }
    });
    
    // Only enforce max attempts for official attempts, not practice mode
    if (!practiceMode && quiz.maxAttempts && attemptCount >= quiz.maxAttempts) {
      return res.status(400).json({ 
        error: 'Maximum attempts exceeded',
        practiceAvailable: true,
        message: 'You can still practice this quiz without it counting towards your attempts'
      });
    }

    console.log('Questions found:', quiz.questions.length);
    
    if (quiz.questions.length === 0) {
      return res.status(400).json({ error: 'No questions found for this quiz' });
    }

    let totalScore = 0;
    let maxScore = 0;
    let correctAnswersCount = 0;
    const detailedFeedback = [];

    for (const question of quiz.questions) {
      maxScore += question.points;
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer && userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        totalScore += question.points;
        correctAnswersCount++;
      }

      detailedFeedback.push({
        questionId: question.id,
        questionText: question.questionText,
        userAnswer: userAnswer || 'No answer provided',
        correctAnswer: question.correctAnswer,
        isCorrect,
        points: isCorrect ? question.points : 0,
        maxPoints: question.points,
        explanation: question.explanation || 'No explanation available',
        options: question.options ? JSON.parse(question.options) : []
      });
    }

    const scorePercentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    const passed = scorePercentage >= quiz.passingScore;

    console.log('Score calculation:', { totalScore, maxScore, scorePercentage, passed, practiceMode });

    // Only save attempt to database if not in practice mode
    let attempt = null;
    if (!practiceMode) {
      attempt = await prisma.quizAttempt.create({
        data: {
          userId,
          quizId,
          score: scorePercentage,
          passed,
          answers: JSON.stringify(answers),
          completedAt: new Date(),
          timeTakenMinutes: timeTaken || null
        }
      });
    }

    // Generate performance insights
    const performanceInsights = [];
    if (scorePercentage >= 90) {
      performanceInsights.push("Excellent work! You've mastered this material.");
    } else if (scorePercentage >= quiz.passingScore) {
      performanceInsights.push("Good job! You've passed the assessment.");
      if (correctAnswersCount < quiz.questions.length) {
        performanceInsights.push("Review the questions you missed to strengthen your understanding.");
      }
    } else {
      performanceInsights.push("Keep studying! Review the lesson material and try again.");
      const weakAreas = detailedFeedback.filter(f => !f.isCorrect).length;
      performanceInsights.push(`Focus on understanding the ${weakAreas} concepts you missed.`);
    }

    if (practiceMode) {
      performanceInsights.push("This was a practice attempt - it doesn't count toward your official attempts.");
    }

    res.json({
      attempt,
      score: scorePercentage,
      passed,
      practiceMode,
      detailedFeedback,
      performanceInsights,
      totalScore,
      maxScore,
      correctAnswers: correctAnswersCount,
      totalQuestions: quiz.questions.length,
      timeSpent: timeTaken ? `${timeTaken} minutes` : 'Time not tracked',
      remainingAttempts: practiceMode ? null : Math.max(0, quiz.maxAttempts - attemptCount - 1)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

router.get('/:quizId/attempts', authenticate, async (req: AuthRequest, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.user!.id;

    const attempts = await prisma.quizAttempt.findMany({
      where: {
        userId,
        quizId
      },
      orderBy: {
        completedAt: 'desc'
      }
    });

    res.json(attempts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch attempts' });
  }
});

// New endpoint for detailed quiz results with analytics
router.get('/:quizId/results', authenticate, async (req: AuthRequest, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.user!.id;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { orderIndex: 'asc' }
        },
        week: {
          select: {
            title: true,
            weekNumber: true,
            courseId: true
          }
        }
      }
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const attempts = await prisma.quizAttempt.findMany({
      where: {
        userId,
        quizId
      },
      orderBy: {
        completedAt: 'desc'
      }
    });

    if (attempts.length === 0) {
      return res.json({
        quiz: {
          id: quiz.id,
          title: quiz.title,
          week: quiz.week
        },
        attempts: [],
        analytics: {
          hasAttempts: false,
          message: 'No attempts yet. Take the quiz to see your results!'
        }
      });
    }

    const bestAttempt = attempts.reduce((best, current) => 
      (current.score || 0) > (best.score || 0) ? current : best
    );
    
    const averageScore = attempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / attempts.length;
    const passedAttempts = attempts.filter(attempt => attempt.passed).length;
    const totalTime = attempts.reduce((sum, attempt) => sum + (attempt.timeTakenMinutes || 0), 0);

    // Performance trends
    const performanceTrend = attempts.length > 1 ? 
      (attempts[0].score || 0) - (attempts[attempts.length - 1].score || 0) : 0;

    const analytics = {
      hasAttempts: true,
      totalAttempts: attempts.length,
      bestScore: bestAttempt.score,
      averageScore: Math.round(averageScore * 100) / 100,
      passedAttempts,
      totalTimeSpent: totalTime,
      averageTimePerAttempt: totalTime > 0 ? Math.round(totalTime / attempts.length) : 0,
      performanceTrend: performanceTrend > 0 ? 'improving' : performanceTrend < 0 ? 'declining' : 'stable',
      improvementPoints: Math.round(performanceTrend * 100) / 100,
      recommendations: generateRecommendations(bestAttempt, quiz, attempts.length)
    };

    res.json({
      quiz: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        passingScore: quiz.passingScore,
        maxAttempts: quiz.maxAttempts,
        week: quiz.week,
        totalQuestions: quiz.questions.length
      },
      attempts,
      bestAttempt,
      analytics
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch quiz results' });
  }
});

function generateRecommendations(bestAttempt: any, quiz: any, attemptCount: number) {
  const recommendations = [];
  const score = bestAttempt.score || 0;
  
  if (score >= 90) {
    recommendations.push('🎉 Excellent mastery! You can mentor others on this topic.');
    recommendations.push('✨ Consider moving to more advanced topics in this subject area.');
  } else if (score >= quiz.passingScore) {
    recommendations.push('✅ Good work! You understand the core concepts.');
    recommendations.push('📚 Review incorrect answers to strengthen weak areas.');
    recommendations.push('🎯 Aim for 90%+ on your next attempt for mastery level.');
  } else {
    recommendations.push('📖 Review the lesson materials before attempting again.');
    recommendations.push('🤔 Focus on understanding concepts, not just memorizing answers.');
    recommendations.push('💡 Try the practice mode to improve without using official attempts.');
  }

  if (attemptCount >= quiz.maxAttempts && !bestAttempt.passed) {
    recommendations.push('🔄 Use practice mode to continue improving your understanding.');
    recommendations.push('👨‍🏫 Consider reaching out for help with challenging concepts.');
  }

  return recommendations;
}

export default router;