const createFooter = () =>{
    let footer = document.querySelector('footer');
    footer.innerHTML = `
            <div class="footer-content">
                <img src="../img/light-logo.png" class="logo" alt="">
                <div class="footer-ul-container">
                    <ul class="category">
                        <li class="category-title">Men</li>
                        <li><a href="../linkpages.html?id=Men,T-shirts" class="footer-link">T-shirts</a></li>
                        <li><a href="../linkpages.html?id=Men,Sweatshirts" class="footer-link">Sweatshirts</a></li>
                        <li><a href="../linkpages.html?id=Men,Shirts" class="footer-link">Shirts</a></li>
                        <li><a href="../linkpages.html?id=Men,Jeans" class="footer-link">Jeans</a></li>
                        <li><a href="../linkpages.html?id=Men,Trousers" class="footer-link">Trousers</a></li>
                        <li><a href="../linkpages.html?id=Men,Shoes" class="footer-link">Shoes</a></li>
                        <li><a href="../linkpages.html?id=Men,Casuals" class="footer-link">Casuals</a></li>
                        <li><a href="../linkpages.html?id=Men,Formals" class="footer-link">Formals</a></li>
                        <li><a href="../linkpages.html?id=Men,Sports" class="footer-link">Sports</a></li>
                        <li><a href="../linkpages.html?id=Men,Watch" class="footer-link">Watch</a></li>
                    </ul>
                    <ul class="category">
                        <li class="category-title">Women</li>
                        <li><a href="../linkpages.html?id=Women,T-shirts" class="footer-link">T-shirts</a></li>
                        <li><a href="../linkpages.html?id=Women,Sweatshirts" class="footer-link">Sweatshirts</a></li>
                        <li><a href="../linkpages.html?id=Women,Shirts" class="footer-link">Shirts</a></li>
                        <li><a href="../linkpages.html?id=Women,Jeans" class="footer-link">Jeans</a></li>
                        <li><a href="../linkpages.html?id=Women,Trousers" class="footer-link">Trousers</a></li>
                        <li><a href="../linkpages.html?id=Women,Shoes" class="footer-link">Shoes</a></li>
                        <li><a href="../linkpages.html?id=Women,Casuals" class="footer-link">Casuals</a></li>
                        <li><a href="../linkpages.html?id=Women,Formals" class="footer-link">Formals</a></li>
                        <li><a href="../linkpages.html?id=Women,Sports" class="footer-link">Sports</a></li>
                        <li><a href="../linkpages.html?id=Women,Watch" class="footer-link">Watch</a></li>
                    </ul>
                </div>
            </div>
            <p class="footer-title">About company</p>
            <p class="info"> Gucci Paradiso is an international lifestyle brand that represents audacious
            and progressive ideals through a seductive and often minimalist aesthetic. We want to excite
             and inspire our audience, through provocative images and extraordinary designs that involve 
             all the senses. </p>
            <p class="info">support emails - progettositoamoretti@gmail.com, support@gucciparadiso.com</p>
            <p class="info">telephone +39 123 456 7890</p>
            <div class="footer-social-container">
                <div>
                        <a href="https://policies.google.com/terms?hl=en-US" class="social-link">terms & services</a>
                        <a href="https://www.governo.it/it/privacy-policy" class="social-link">privacy page</a>
                </div>
                <div>
                    <a href="https://www.instagram.com/" class="social-link">instagram</a>
                    <a href="https://www.facebook.com/" class="social-link">facebook</a>
                    <a href="https://twitter.com/" class="social-link">twitter</a>
                </div>
            </div>
            <p class="footer-credit"> Gucci Paradiso, sins made by angels </p>
    `;

}

createFooter();