import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-[#201408] text-white p-5 mt-8 flex flex-col items-center">
            <div className="flex flex-wrap max-w-6xl w-full mx-auto justify-between">
                <div className="flex-1 min-w-[200px] m-2">
                    <h3 className="text-xl font-extrabold mb-3">Biruk Habesha</h3>
                    <ul>
                        <li className="my-1"><a href="#" className="hover:underline">About Us</a></li>
                        <li className="my-1"><a href="#" className="hover:underline">Our Team</a></li>
                        <li className="my-1"><a href="#" className="hover:underline">Careers</a></li>
                        <li className="my-1"><a href="#" className="hover:underline">Blog</a></li>
                    </ul>
                </div>
                <div className="flex-1 min-w-[200px] m-2">
                    <h3 className="text-lg">Support</h3>
                    <ul>
                        <li className="my-1"><a href="#" className="hover:underline">Help Center</a></li>
                        <li className="my-1"><a href="#" className="hover:underline">FAQ</a></li>
                        <li className="my-1"><a href="#" className="hover:underline">Privacy Policy</a></li>
                        <li className="my-1"><a href="#" className="hover:underline">Terms of Service</a></li>
                    </ul>
                </div>
                <div className="flex-1 min-w-[200px] m-2">
                    <h3 className="text-lg">Follow Us</h3>
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
                <p>&copy; 2024 BirukHabesha . All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
