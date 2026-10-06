class SiteHeader extends HTMLElement{
    connectedCallback() {
        // Replace this with your actual header HTML
        this.innerHTML=`
        <header id="navebar" class="nav-bar">
        <div class="contener">
            <div>
                <a href="index.html">
                <img src="image/logo.png" alt="logo">
                </a>
            </div>
            <div class="content">
            <div class="moniter">
                <nav>
                    <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="scrolls.html">Prophetic Scrolls</a>
                    <ul class="extra">
                        <a href="">Proohetic Scrolls</a>
                        <a href="">Scroll Archives</a>
                    </ul>
                    </li>
                    <li><a href="decrees.html">Decrees & Prayers</a></li>
                    <li><a href="revelations.html">Teachings & Revelations</a></li>
                    <li><a href="">The Remnant Community</a></li>
                    <li><a href="">Contact</a></li>
                    </ul>
                </nav>
            </div>
            
            </div>
        </div>
    </header>
        `;
    }
}






class SiteFooter extends HTMLElement{
    connectedCallback() {
        // Replace this with your actual footer HTML
        this.innerHTML= `
        <footer id="footer">
        <div class="contener">
            <div class="anker">
                <ul>
                    <li><a href="about.html">ABOUT</a></li>
                    <li><a href="">SCROLLS</a></li>
                    <li><a href="">DECREES</a></li>
                    <li><a href="">TEACHINGS</a></li>
                    <li><a href="">COMMUNITY</a></li>
                    <li><a href="">CONTACT</a></li>
                </ul>
            </div>
            <div class="content">
                <div class="first">
                    <div class="location">
                        <img src="image/location.png" alt="location">
                    <div>
                    <p>Address will come here,
                    </p>
                    <p>Address will come here,
                    </p>
                    </div>
                    </div>
                    <div class="media">
                        <a href="https://www.facebook.com/" target="_blank"><img src="image/face-book.png" alt="FB"></a>
                        <a href="https://www.youtube.com/" target="_blank"><img src="image/you-tub.png" alt="YT"></a>
                        <a href="https://www.instagram.com/" target="_blank"><img src="image/insta.png" alt="IG"></a>
                    </div>
                </div>
                <div class="middle">
                    <a href="index.html"><img src="image/logo.png" alt="logo"></a>
                </div>
                <div class="last">
                    <div class="fst">
                    <div>
                        <img src="image/call.png" alt="call">
                    </div>
                    <div>
                        <p>Call Us Today
                        </p>

                        <a href="tel:123 456-7890">(123) 456-7890</a>
                    </div>
                    </div>
                    <div class="lst">
                    
                        <img src="image/e-mail.png" alt="E-mail">
                        <a href="mailto:info@daughterofthunder.com">info@daughterofthunder.com</a>
                    
                    </div>
                </div>
            </div>
            <div class="bottom">
                <p>© 2026 Daughter of Thunder. All rights Reserved</p>
                <p><b>Isaiah 54:17:</b> <i>“ No weapon formed against you shall prosper, and every tongue that rises against you
                        in judgment you shall condemn.
                        This is the heritage of the servants of the LORD, and their righteousness is from Me,"<b>says
                    the LORD.</b></i></p>
            </div>
        </div>
    </footer>
    `;
    }
}




// Define the custom tags
customElements.define('site-header', SiteHeader)
customElements.define('site-footer', SiteFooter)

