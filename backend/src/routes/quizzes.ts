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
    const { answers, timeTaken } = req.body;
    const userId = req.user!.id;

    console.log('Quiz submission attempt:', { quizId, userId, answers, timeTaken });

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
    
    if (quiz.maxAttempts && attemptCount >= quiz.maxAttempts) {
      return res.status(400).json({ error: 'Maximum attempts exceeded' });
    }

    console.log('Questions found:', quiz.questions.length);
    
    if (quiz.questions.length === 0) {
      return res.status(400).json({ error: 'No questions found for this quiz' });
    }

    let totalScore = 0;
    let maxScore = 0;
    const feedback = [];

    for (const question of quiz.questions) {
      maxScore += question.points;
      const userAnswer = answers[question.id];
      
      if (userAnswer && userAnswer === question.correctAnswer) {
        totalScore += question.points;
        feedback.push({
          questionId: question.id,
          correct: true,
          explanation: question.explanation
        });
      } else {
        feedback.push({
          questionId: question.id,
          correct: false,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation
        });
      }
    }

    const scorePercentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    const passed = scorePercentage >= quiz.passingScore;

    console.log('Score calculation:', { totalScore, maxScore, scorePercentage, passed });

    const attempt = await prisma.quizAttempt.create({
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

    res.json({
      attempt,
      score: scorePercentage,
      passed,
      feedback,
      totalScore,
      maxScore,
      correctAnswers: totalScore,
      totalQuestions: quiz.questions.length,
      timeSpent: timeTaken ? `${timeTaken} min` : null
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

export default router;