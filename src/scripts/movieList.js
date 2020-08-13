class okNavbar extends HTMLElement{
    constructor(){
        super();
        this.innerHTML=`
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="#carifilm">Movies.info</a>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                </div>
                <div class="row mt-3 justify-content-center">
                    <div class="col-md-10">
                        <div class="input-group mb-3">
                            <input id="search-input" type="text" class="form-control" placeholder="Movie Title ...">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button" id="search-button">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        `;
    }
}

customElements.define("ok-navbar", okNavbar);