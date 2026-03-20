
-- Add user_id to presenter_notes
ALTER TABLE public.presenter_notes ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id to presentation_media
ALTER TABLE public.presentation_media ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop old permissive policies on presenter_notes
DROP POLICY IF EXISTS "Allow public delete to presenter_notes" ON public.presenter_notes;
DROP POLICY IF EXISTS "Allow public insert to presenter_notes" ON public.presenter_notes;
DROP POLICY IF EXISTS "Allow public read access to presenter_notes" ON public.presenter_notes;
DROP POLICY IF EXISTS "Allow public update to presenter_notes" ON public.presenter_notes;

-- Drop old permissive policies on presentation_media
DROP POLICY IF EXISTS "Allow public delete presentation_media" ON public.presentation_media;
DROP POLICY IF EXISTS "Allow public insert presentation_media" ON public.presentation_media;
DROP POLICY IF EXISTS "Allow public read presentation_media" ON public.presentation_media;
DROP POLICY IF EXISTS "Allow public update presentation_media" ON public.presentation_media;

-- New user-scoped RLS policies for presenter_notes
CREATE POLICY "Users can read own notes" ON public.presenter_notes FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notes" ON public.presenter_notes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notes" ON public.presenter_notes FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notes" ON public.presenter_notes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- New user-scoped RLS policies for presentation_media
CREATE POLICY "Users can read own media" ON public.presentation_media FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own media" ON public.presentation_media FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own media" ON public.presentation_media FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own media" ON public.presentation_media FOR DELETE TO authenticated USING (auth.uid() = user_id);
