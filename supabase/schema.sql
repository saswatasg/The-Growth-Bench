-- Claude Practitioner Training — Supabase Schema
-- Run this in the Supabase SQL Editor after creating the project.

-- Enrollments: company-level booking
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  company_size TEXT,
  preferred_delivery TEXT CHECK (preferred_delivery IN ('virtual','on-site','either')),
  seat_count INTEGER NOT NULL CHECK (seat_count BETWEEN 1 AND 8),
  discount_code TEXT,
  discount_amount_paise INTEGER DEFAULT 0,
  total_paise INTEGER NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending','confirmed','cancelled')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Roster: individual participants tied to an enrollment
CREATE TABLE IF NOT EXISTS roster (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  participant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  consent_given BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Certificates: issued after passing the assessment
CREATE TABLE IF NOT EXISTS certificates (
  cert_id TEXT PRIMARY KEY, -- GB-CPT-XXXXXXXX
  roster_id UUID REFERENCES roster(id),
  enrollment_id UUID REFERENCES enrollments(id),
  candidate_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  course_name TEXT DEFAULT 'Claude Practitioner Training',
  score INTEGER, -- assessment score percentage
  completion_date DATE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','revoked')),
  issued_at TIMESTAMPTZ DEFAULT now(),
  issued_by TEXT,
  revoked_at TIMESTAMPTZ,
  revoked_by TEXT
);

-- Assessment attempts
CREATE TABLE IF NOT EXISTS assessment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roster_id UUID REFERENCES roster(id),
  enrollment_id UUID REFERENCES enrollments(id),
  attempt_number INTEGER NOT NULL CHECK (attempt_number BETWEEN 1 AND 2),
  questions JSONB NOT NULL,
  answers JSONB,
  score INTEGER,
  total_possible INTEGER,
  percentage DECIMAL(5,2),
  passed BOOLEAN,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed','abandoned'))
);

-- Question bank
CREATE TABLE IF NOT EXISTS question_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('scenario','ordering','simulation','fill_blank','decision_tree')),
  category TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('easy','medium','hard')),
  question_data JSONB NOT NULL,
  points INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Audit log
CREATE TABLE IF NOT EXISTS cert_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cert_id TEXT,
  action TEXT NOT NULL CHECK (action IN ('issued','revoked','reissued')),
  performed_by TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);
CREATE INDEX IF NOT EXISTS idx_roster_enrollment ON roster(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_certificates_status ON certificates(status);
CREATE INDEX IF NOT EXISTS idx_certificates_company ON certificates(company_name);
CREATE INDEX IF NOT EXISTS idx_assessment_roster ON assessment_attempts(roster_id);
CREATE INDEX IF NOT EXISTS idx_question_bank_active ON question_bank(active, category);

-- RLS: enable row-level security (policies to be added per environment)
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE roster ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE cert_audit_log ENABLE ROW LEVEL SECURITY;
