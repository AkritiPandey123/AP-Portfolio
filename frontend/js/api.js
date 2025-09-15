const API_BASE = 'http://localhost:5000/api';
const api = {
  fetchProjects: async ()=> {
    try{ const r = await fetch(API_BASE + '/projects'); return await r.json(); }catch(e){ return []; }
  },
  fetchBlogs: async ()=> {
    try{ const r = await fetch(API_BASE + '/blogs'); return await r.json(); }catch(e){ return []; }
  },
  sendContact: async (data)=> {
    try{ const r = await fetch(API_BASE + '/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) }); return await r.json(); }catch(e){ return { message:'Error' } }
  },
  login: async (creds)=> {
    const r = await fetch(API_BASE + '/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(creds) });
    return await r.json();
  },
  createProject: async (data, token)=> {
    const r = await fetch(API_BASE + '/projects', { method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+token}, body: JSON.stringify(data) });
    return await r.json();
  },
  getProjectsAdmin: async (token)=> {
    const r = await fetch(API_BASE + '/projects', { headers:{ 'Authorization':'Bearer '+token } }); return await r.json();
  },
  deleteProject: async (id, token)=> {
    const r = await fetch(API_BASE + '/projects/'+id, { method:'DELETE', headers:{ 'Authorization':'Bearer '+token } }); return await r.json();
  },
  createBlog: async (data, token)=> {
    const r = await fetch(API_BASE + '/blogs', { method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+token}, body: JSON.stringify(data) });
    return await r.json();
  },
  getBlogsAdmin: async (token)=> {
    const r = await fetch(API_BASE + '/blogs', { headers:{ 'Authorization':'Bearer '+token } }); return await r.json();
  },
  deleteBlog: async (id, token)=> {
    const r = await fetch(API_BASE + '/blogs/'+id, { method:'DELETE', headers:{ 'Authorization':'Bearer '+token } }); return await r.json();
  }
};
