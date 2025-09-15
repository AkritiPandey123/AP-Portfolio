(function(){
  const loginForm = document.getElementById('loginForm');
  const cms = document.getElementById('cms');
  const auth = document.getElementById('auth');
  const loginStatus = document.getElementById('loginStatus');
  const tokenKey = 'pcms_token';

  loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const res = await api.login(data);
    if(res.token){
      localStorage.setItem(tokenKey, res.token);
      auth.style.display = 'none';
      cms.style.display = 'block';
      loadCMS();
    } else {
      loginStatus.innerText = res.message || 'Login failed';
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', ()=>{
    localStorage.removeItem(tokenKey);
    location.reload();
  });

  async function loadCMS(){
    const token = localStorage.getItem(tokenKey);
    if(!token) return;
    document.getElementById('auth').style.display = 'none';
    document.getElementById('cms').style.display = 'block';
    // projects
    const projects = await api.getProjectsAdmin(token);
    document.getElementById('cmsProjects').innerHTML = projects.map(p=>`
      <div class="card">
        <h4>${p.title}</h4><button data-id="${p._id}" class="delProj">Delete</button>
      </div>
    `).join('');
    document.querySelectorAll('.delProj').forEach(btn=>{
      btn.addEventListener('click', async (e)=>{
        const id = e.target.dataset.id;
        await api.deleteProject(id, token);
        loadCMS();
      });
    });
    // blogs
    const blogs = await api.getBlogsAdmin(token);
    document.getElementById('cmsBlogs').innerHTML = blogs.map(b=>`
      <div class="card">
        <h4>${b.title}</h4><button data-id="${b._id}" class="delBlog">Delete</button>
      </div>
    `).join('');
    document.querySelectorAll('.delBlog').forEach(btn=>{
      btn.addEventListener('click', async (e)=>{
        const id = e.target.dataset.id;
        await api.deleteBlog(id, token);
        loadCMS();
      });
    });
  }

  // create project
  document.getElementById('projForm').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const token = localStorage.getItem(tokenKey);
    const data = Object.fromEntries(new FormData(e.target).entries());
    data.tech = data.tech ? data.tech.split(',').map(s=>s.trim()) : [];
    await api.createProject(data, token);
    e.target.reset();
    loadCMS();
  });

  document.getElementById('blogForm').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const token = localStorage.getItem(tokenKey);
    const data = Object.fromEntries(new FormData(e.target).entries());
    data.tags = data.tags ? data.tags.split(',').map(s=>s.trim()) : [];
    await api.createBlog(data, token);
    e.target.reset();
    loadCMS();
  });

  // auto show CMS if token exists
  if(localStorage.getItem(tokenKey)) loadCMS();
})();
