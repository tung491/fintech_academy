import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../db/prisma';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get user's certificates
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    
    const certificates = await prisma.certificate.findMany({
      where: {
        userId: userId
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            instructor: true,
            duration: true,
            estimatedHours: true,
            level: true
          }
        }
      },
      orderBy: {
        issuedAt: 'desc'
      }
    });

    res.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get specific certificate by ID
router.get('/:certificateId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { certificateId } = req.params;
    const userId = req.user?.id;
    
    const certificate = await prisma.certificate.findFirst({
      where: {
        id: certificateId,
        userId: userId
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            instructor: true,
            duration: true,
            estimatedHours: true,
            level: true,
            description: true
          }
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.json(certificate);
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify certificate by verification code (public endpoint)
router.get('/verify/:verificationCode', async (req: AuthRequest, res) => {
  try {
    const { verificationCode } = req.params;
    
    const certificate = await prisma.certificate.findUnique({
      where: {
        verificationCode: verificationCode
      },
      include: {
        course: {
          select: {
            title: true,
            instructor: true,
            duration: true,
            estimatedHours: true,
            level: true
          }
        },
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found or invalid verification code' });
    }

    res.json({
      valid: true,
      certificate: {
        id: certificate.id,
        issuedAt: certificate.issuedAt,
        verificationCode: certificate.verificationCode,
        course: certificate.course,
        student: {
          name: `${certificate.user.firstName} ${certificate.user.lastName}`
        }
      }
    });
  } catch (error) {
    console.error('Error verifying certificate:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Generate certificate for completed course
router.post('/generate/:courseId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.id;
    
    // Check if user has completed the course
    const enrollment = await prisma.userEnrollment.findFirst({
      where: {
        userId: userId,
        courseId: courseId,
        completedAt: {
          not: null
        }
      },
      include: {
        course: true
      }
    });

    if (!enrollment) {
      return res.status(400).json({ message: 'Course not completed or not enrolled' });
    }

    // Check if certificate already exists
    const existingCertificate = await prisma.certificate.findFirst({
      where: {
        userId: userId,
        courseId: courseId
      }
    });

    if (existingCertificate) {
      return res.status(400).json({ message: 'Certificate already exists for this course' });
    }

    // Generate verification code
    const verificationCode = `FINACAD-${uuidv4().substring(0, 8).toUpperCase()}`;

    // Create certificate
    const certificate = await prisma.certificate.create({
      data: {
        userId: userId,
        courseId: courseId,
        verificationCode: verificationCode
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            instructor: true,
            duration: true,
            estimatedHours: true,
            level: true
          }
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Certificate generated successfully',
      certificate: certificate
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Check if user can generate certificate for a course
router.get('/check/:courseId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.id;
    
    // Check enrollment and completion
    const enrollment = await prisma.userEnrollment.findFirst({
      where: {
        userId: userId,
        courseId: courseId
      }
    });

    // Check if certificate already exists
    const existingCertificate = await prisma.certificate.findFirst({
      where: {
        userId: userId,
        courseId: courseId
      }
    });

    const canGenerate = enrollment && 
                       enrollment.completedAt !== null && 
                       !existingCertificate;

    res.json({
      enrolled: !!enrollment,
      completed: enrollment?.completedAt !== null,
      hasExistingCertificate: !!existingCertificate,
      canGenerateCertificate: canGenerate,
      completedAt: enrollment?.completedAt,
      progressPercentage: enrollment?.progressPercentage || 0
    });
  } catch (error) {
    console.error('Error checking certificate eligibility:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;