-- Create a trigger to automatically create a profile when a user signs up
-- This ensures every auth.users record has a corresponding profiles record

-- Function to create profile automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'fullName', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function after user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create profiles for any existing users that don't have one
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'fullName', u.email, 'User'),
  COALESCE(u.raw_user_meta_data->>'role', 'student')
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = u.id
)
ON CONFLICT (id) DO NOTHING;
