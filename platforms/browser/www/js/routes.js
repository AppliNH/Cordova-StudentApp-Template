routes = [
    {
      path: '/',
      url: './index.html',
      title: 'Home'
    },
    {
      path: '/actualites/',
      url: './pages/actualites.html',
      title: 'News | Section 3'
    },
    {
      path: '/actualites/:page/',
      url: './pages/actualites.html',
      title: 'News | Section 3'
    },
    {
      path: '/actualite/:id/',
      url: './pages/actualite.html',
      title: 'News | Section 3'
    },
    {
      path: '/faq/',
      url: './pages/faq.html',
      title: 'FAQ'
    },
    {
      path: '/partenaires/',
      url: './pages/partenaires.html',
      title: 'Sponsors'
    },
    {
      path: '/agenda/',
      url: './pages/agenda.html',
      title: "Events' Calendar" 
    },
    {
      path: '/clubs/',
      url: './pages/clubs.html',
      title: 'Our Friends !'
    },
    {
      path: '/club/:id/',
      url: './pages/club.html'
    },
    {
      path: '/carte-amicaliste/',
      url: './pages/carte-amicaliste.html',
      title: 'Member Card'
    },
    {
      path: '/parametres/',
      url: './pages/parametres.html',
      title: 'Settings'
    },
    {
      path: '/nous-contacter/',
      url: './pages/nous-contacter.html',
      title: 'Contact US'
    },
    {
      path: '/mentions-legales/',
      url: './pages/mentions-legales.html',
      title: 'Legal Notice'
    },
    {
      path: '/deviens-amicaliste/',
      url: './pages/deviens-amicaliste.html',
      title: 'Become a member !'
    },
    {
      path: '/aboutteam/',
      url: './pages/aboutteam.html',
      title: 'About this app'
    },
    {
      path: '/hotnews/',
      url: './pages/hotnews.html',
      title: 'News | Section 1'
    },
    {
      path: '/alaune/',
      url: './pages/alaune.html',
      title: 'News | Section 2'
    },
    // OMG PLEASE DO NOT ADD OTHER PATHS BELOW THIS LAST PATH, THE ONLY WAY IS UP
    {
      path: '(.*)',
      url: './pages/404.html',
      title: '404 not found lmao'
    }
  ]