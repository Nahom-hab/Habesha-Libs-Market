import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import useAdmin from '../zustand/useAdmin';

const Footer = () => {
    const { isEng } = useAdmin();

    const translations = {
        en: {
            aboutUs: "About Us",
            ourTeam: "Our Team",
            careers: "Careers",
            blog: "Blog",
            support: "Support",
            helpCenter: "Help Center",
            faq: "FAQ",
            privacyPolicy: "Privacy Policy",
            termsOfService: "Terms of Service",
            followUs: "Follow Us",
            copyright: "&copy; 2024 BirukHabesha. All rights reserved."
        },
        amh: {
            aboutUs: "ስለ እኛ",
            ourTeam: "የቡድን አባላት",
            careers: "እርምጃዎች",
            blog: "ብሎግ",
            support: "ድጋፍ",
            helpCenter: "እርዳታ ማዕከል",
            faq: "በቻለ ጥያቄዎች",
            privacyPolicy: "የግል ፖሊሲ",
            termsOfService: "የአጠቃላይ አጠቃላይ አሰባሰብ",
            followUs: "እኛን እንደገና እንድታውቁ",
            copyright: "&copy; 2024 ቡድን ቴክ ሐበሻ. ሁሉም መብቶች የተያዙ ናቸው።"
        }
    };

    return (
        <footer className="bg-[#201408] text-white p-5 mt-8 flex flex-col items-center">
            <div className="flex flex-wrap max-w-6xl w-full mx-auto justify-between">
                <div className="flex-1 min-w-[200px] m-2">
                    <h3 className="text-xl font-extrabold mb-3">Biruk Habesha</h3>
                    <ul>
                        <li className="my-1"><a href="#" className="hover:underline">{isEng ? translations.en.aboutUs : translations.amh.aboutUs}</a></li>
                        <li className="my-1"><a href="#" className="hover:underline">{isEng ? translations.en.ourTeam : translations.amh.ourTeam}</a></li>
                        <li className="my-1"><a href="#" className="hover:underline">{isEng ? translations.en.careers : translations.amh.careers}</a></li>
                        <li className="my-1"><a href="#" className="hover:underline">{isEng ? translations.en.blog : translations.amh.blog}</a></li>
                    </ul>
                </div>
                <div className="flex-1 min-w-[200px] m-2">
                    <h3 className="text-lg">{isEng ? translations.en.support : translations.amh.support}</h3>
                    <ul>
                        <li className="my-1"><a href="#" className="hover:underline">{isEng ? translations.en.helpCenter : translations.amh.helpCenter}</a></li>
                        <li className="my-1"><a href="#" className="hover:underline">{isEng ? translations.en.faq : translations.amh.faq}</a></li>
                        <li className="my-1"><a href="#" className="hover:underline">{isEng ? translations.en.privacyPolicy : translations.amh.privacyPolicy}</a></li>
                        <li className="my-1"><a href="#" className="hover:underline">{isEng ? translations.en.termsOfService : translations.amh.termsOfService}</a></li>
                    </ul>
                </div>
                <div className="flex-1 min-w-[200px] m-2">
                    <h3 className="text-lg">{isEng ? translations.en.followUs : translations.amh.followUs}</h3>
                    <ul className="flex gap-2">
                        <li><a href="#" aria-label="Facebook" className="text-xl text-white hover:text-[#61dafb]"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                        <li><a href="#" aria-label="Twitter" className="text-xl text-white hover:text-[#61dafb]"><FontAwesomeIcon icon={faTwitter} /></a></li>
                        <li><a href="#" aria-label="Instagram" className="text-xl text-white hover:text-[#61dafb]"><FontAwesomeIcon icon={faInstagram} /></a></li>
                        <li><a href="#" aria-label="LinkedIn" className="text-xl text-white hover:text-[#61dafb]"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                        <li><a href="#" aria-label="GitHub" className="text-xl text-white hover:text-[#61dafb]"><FontAwesomeIcon icon={faGithub} /></a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-5">
                <p dangerouslySetInnerHTML={{ __html: isEng ? translations.en.copyright : translations.amh.copyright }} />
            </div>
        </footer>
    );
};

export default Footer;
