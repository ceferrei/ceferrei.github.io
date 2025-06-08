-- Script SQL para criar a tabela no Supabase (se escolher essa opção)
CREATE TABLE IF NOT EXISTS site_stats (
  id TEXT PRIMARY KEY,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir registro inicial
INSERT INTO site_stats (id, views) 
VALUES ('portfolio', 0) 
ON CONFLICT (id) DO NOTHING;

-- Criar política RLS (Row Level Security)
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

-- Permitir leitura para todos
CREATE POLICY "Allow read access for all users" ON site_stats
FOR SELECT USING (true);

-- Permitir update apenas para usuários autenticados (ou service role)
CREATE POLICY "Allow update for authenticated users" ON site_stats
FOR UPDATE USING (true);
