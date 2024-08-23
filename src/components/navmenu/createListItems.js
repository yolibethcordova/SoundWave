import { getHtmlPageName } from "./getHtmlPageName.js";
import { getCurrentHtmlPage } from "./getCurrentHtml.js";

const createListItems = ( pages, currentHtml ) => {
    const userSesion = {
      role : "customer",
      isAdmin : false,
      expiration: 0
    }

    const loadUserSesion = JSON.parse( localStorage.getItem("userSesion") );
    if (loadUserSesion !== null) {
      const { role = "customer", isAdmin = false, expiration = 0 } = loadUserSesion;
      userSesion.role = role;
      userSesion.isAdmin = isAdmin;
      userSesion.expiration = expiration;
      
      if (userSesion.isAdmin) {
          console.log("User is admin");
      }
  }
  


    pages.forEach( page => {
        const htmlName = getHtmlPageName( page.url );
        
        if( htmlName === currentHtml ){
          page.active = true
        } 

        if( userSesion.isAdmin ){
          page.visible = true;          
        }

    });    

    const listItemsArray = pages
    .filter(page => page.visible) // Filtrar páginas visibles
    .map(page => `
        <a 
            id="navmenu-item" class="nav-link ${page.active ? 'active' : ''}" 
            href="${page.url}"> 
            ${page.name} 
        </a>
    `);


    return listItemsArray.join("");
}

export { createListItems }; 