import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Enrollment operations
export async function createEnrollment(enrollment) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('enrollments')
    .insert(enrollment)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function createRosterEntries(entries) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('roster')
    .insert(entries)
    .select();
  if (error) throw error;
  return data;
}

// Certificate operations
export async function getCertificate(certId) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('certificates')
    .select('cert_id, candidate_name, company_name, course_name, completion_date, status, issued_at')
    .eq('cert_id', certId)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null; // not found
    throw error;
  }
  return data;
}

export async function listCertificates({ company, name, status, limit = 50, offset = 0 } = {}) {
  if (!supabase) throw new Error('Supabase not configured');
  let query = supabase
    .from('certificates')
    .select('*', { count: 'exact' })
    .order('issued_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (company) query = query.ilike('company_name', `%${company}%`);
  if (name) query = query.ilike('candidate_name', `%${name}%`);
  if (status) query = query.eq('status', status);

  const { data, error, count } = await query;
  if (error) throw error;
  return { data, count };
}

export async function issueCertificate(cert) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('certificates')
    .insert(cert)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function revokeCertificate(certId, revokedBy) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('certificates')
    .update({ status: 'revoked', revoked_at: new Date().toISOString(), revoked_by: revokedBy })
    .eq('cert_id', certId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function addAuditLog(entry) {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase
    .from('cert_audit_log')
    .insert(entry);
  if (error) throw error;
}

export async function listAuditLog({ limit = 100, offset = 0 } = {}) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('cert_audit_log')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return data;
}

// Assessment operations
export async function getAssessmentAttempts(rosterId) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('assessment_attempts')
    .select('*')
    .eq('roster_id', rosterId)
    .order('attempt_number');
  if (error) throw error;
  return data;
}

export async function createAssessmentAttempt(attempt) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('assessment_attempts')
    .insert(attempt)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateAssessmentAttempt(id, updates) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('assessment_attempts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getActiveQuestions(category) {
  if (!supabase) throw new Error('Supabase not configured');
  let query = supabase
    .from('question_bank')
    .select('*')
    .eq('active', true);
  if (category) query = query.eq('category', category);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Enrollment listing (admin)
export async function listEnrollments({ limit = 50, offset = 0 } = {}) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error, count } = await supabase
    .from('enrollments')
    .select('*, roster(*)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return { data, count };
}

// CSV export
export async function exportCertificatesCSV() {
  const { data } = await listCertificates({ limit: 10000 });
  if (!data?.length) return '';
  const headers = ['cert_id', 'candidate_name', 'company_name', 'completion_date', 'status', 'issued_at'];
  const rows = data.map(c => headers.map(h => `"${(c[h] || '').toString().replace(/"/g, '""')}"`).join(','));
  return [headers.join(','), ...rows].join('\n');
}
