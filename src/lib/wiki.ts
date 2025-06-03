import { supabase } from './supabase';

export async function createPage(title: string, content: string, categoryId: string) {
  const slug = title.toLowerCase().replace(/\s+/g, '-');
  
  const { data: page, error } = await supabase
    .from('pages')
    .insert({
      title,
      slug,
      content,
      category_id: categoryId,
      created_by: (await supabase.auth.getUser()).data.user?.id
    })
    .select()
    .single();

  if (error) throw error;
  return page;
}

export async function updatePage(id: string, title: string, content: string, categoryId: string) {
  const { data: page, error } = await supabase
    .from('pages')
    .update({
      title,
      content,
      category_id: categoryId,
      updated_by: (await supabase.auth.getUser()).data.user?.id,
      updated_at: new Date()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return page;
}

export async function createCategory(name: string, icon: string, description: string) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  
  const { data: category, error } = await supabase
    .from('categories')
    .insert({
      name,
      slug,
      icon,
      description,
      created_by: (await supabase.auth.getUser()).data.user?.id
    })
    .select()
    .single();

  if (error) throw error;
  return category;
}

export async function getUserRole() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: role } = await supabase
    .from('roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  return role?.role || 'user';
}