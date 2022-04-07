import Subfooter from "./subfooter";
import Socials from "./socials";

const Footer = () => {
    return (
        <>
            <div>
                <img className={"footer-logo"} src={'images/logo.png'}/>
            </div>
            <section className={"footer"}>
                <div className={"container"}>
                    <div className={"footer-column"}>
                        <h4>Our Taste</h4>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis Theme natoque</p>
                        <Socials />
                    </div>
                    <div className={"footer-column"}>
                        <h4>Contact gegevens</h4>
                        <p>Postbus 1046</p>
                        <p>5512 ZG Vessem</p>
                        <p>info@ourtaste.nl</p>
                        <p>06-23033384</p>
                    </div>
                    <div className={"footer-column"}><
                        h4>Handige links</h4>
                        <p>Recepten</p>
                        <p>Kruiden</p>
                        <p>Wijn</p>
                        <p>Olijven</p>
                        <p>Sauzen</p>
                    </div>
                    <div className={"footer-column"}><h4>Nieuwsbrief</h4></div>
                </div>
            </section>
            <Subfooter/>
        </>
    );
}

export default Footer;