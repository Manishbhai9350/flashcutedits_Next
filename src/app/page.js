'use client'
import Link from 'next/link';
import ContactForm from './_components/ContactForm';
import './index.css'
import {CiFacebook} from 'react-icons/ci'
import { FaInstagram } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";

export default function Home() {
  return (
    <main>
      <section className="landing">
        <div className="image">
          <img src="/grid.avif" alt="" />
        </div>
        <h1 className="santoshi">Welcome To</h1>
        <h1 className="santoshi">Flashcut Edits</h1>
        <p style={{position:'relative',zIndex:99,color:'white'}} className="courier">Professional Video Editing And Graphic Desinging</p>
        <div className="landing-socials">
          <div className="socials">
            <div style={{background:'transparent'}} className="social">
              <Link style={{color:'white'}} href="https://www.facebook.com/FlashCutEdits/" target="_blank">
                <CiFacebook />
              </Link>
            </div>
            <div style={{background:'transparent'}} className="social">
              <Link style={{color:'white'}} href="https://www.instagram.com/flashcut.tanishq/" target="_blank" >
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="service-section">
        <div className="service-info">
          <h1 className="service-heading split-text-heading santoshi">Our Services</h1>
          <div className="services">
            <div className="service">
              <div className="image">
                <img src="/basic_editing.jpg" alt="" />
              </div>
              <h4 className="courier">Basic Video Editing</h4>
            </div>
            <div className="service">
              <div className="image">
                <img src="/graphic_design.jpg" alt="" />
              </div>
              <h4 className="courier">Advance Video Editing</h4>
            </div>
            <div className="service">
              <div className="image">
                <img src="/edit.jpg" alt="" />
              </div>
              <h4 className="courier">Graphic Desinging</h4>
            </div>
          </div>
        </div>
      </section>
      <section id="about-section" className="about-section">
        <div className="about-img">
          <div className="img">
            <img src="/team.jpg" alt="img" srcSet=""/>
          </div>
        </div>
        <div className="about-info santoshi">
          <h1>Welcome to Flashcut Edits - Where Creativity Meets Precision!
          </h1>
          <p className="courier">At Flashcut Edits, we specialize in high-quality, professional video editing services tailored for content creators, businesses, and influencers. Whether you're a YouTuber, an entrepreneur, or a brand looking to elevate your video content, we ensure seamless edits that engage and captivate your audience.
          </p>
        </div>
      </section>
      <section className="why-us-section">
        <div className="us-info">
          <h3 className="santoshi">Why Choose US?</h3>
        <div className="us-about">
          <ul>
            <li>
              <p style={{fontSize: ".88rem!importan",letterSpacing:-.5}} className="courier">
                Experienced Editors - Our team includes skilled professionals with
                2+ to 4+ years of experience, ensuring precise and high-quality
                video edits.
              </p>
            </li>
            <li>
              <p style={{fontSize:".88rem!importan",letterSpacing:-.5}} className="courier">
                Customized to Your Style - Whether you prefer cinematic, fast-paced,
                or minimal edits, we adapt to your unique branding and vision.
              </p>
              
            </li>
            <li>
              
                      <p style={{fontSize:".88rem!importan",letterSpacing:-.5}} className="courier">
                        High-Retention Edits - Our expertise in YouTube, Reels, Shorts, and
                        business videos ensures content that keeps viewers hooked.
                      </p>

            </li>
            <li>
              
                      <p style={{fontSize:".88rem!importan",letterSpacing:-.5}} className="courier">
                        Social Media Optimization - We craft viral-worthy edits that align
                        with Instagram, TikTok, and YouTube's latest trends.
                      </p>

            </li>
            <li>

              <p style={{fontSize:".88rem!importan",letterSpacing:-.5}} className="courier">
                Eye-Catching Thumbnails - Get professionally designed YouTube
                thumbnails that maximize clicks and engagement.
              </p>
            </li>
            <li>
              <p style={{fontSize:".88rem!importan",letterSpacing:-.5}} className="courier">
                Let's create Video / Thumbnails that grab attention and boost your
                bussiness or idea performance! Let me know if you're interested. 🚀
              </p>

            </li>
          </ul>
  
  
        </div>
        </div>
        <div className="us-image">
          <div className="img">
            <img src="/why_us.jpg" alt=""/>
          </div>
        </div>
      </section>
      <div id="contact-section" className="contact-section">
        <div className="contact-content">
          <h1 className="santoshi">Contact Us</h1>
        <p className="courier">
          Got a project in mind? Let's bring your vision to life! At Flashcut Edits, we deliver high-quality video editing tailored to your needs.
        </p>
        </div>
        <div className="contact">
          <div className="visit">
            <div className="info-con">
              <h4 className="santoshi">Visit Us</h4>
              
              <div className="visit-content">
                <div className="visit-child">
                  <div style={{background:'transparent'}} className="icon">
                    <FaPhoneAlt style={{color:"white",fontSize:23}} />
                  </div>
                  <div className="info">
                    <h3 className="santoshi">Phone</h3>
                    <p className="courier">+919867009961</p>
                  </div>
                </div>
                <div className="visit-child">
                  <div style={{background:'transparent'}} className="icon">
                    <CgMail style={{color:"white",fontSize:35,fontWeight:200}} />
                  </div>
                  <div className="info">
                    <h3 className="santoshi">Email</h3>
                    <p className="courier">flashcuteditss@gmail.com</p>
                  </div>
                </div>
                <div className="socials">
                  <div style={{background:'transparent'}} className="social">
                    <Link style={{color:'white'}} target="_blank" href="https://www.facebook.com/FlashCutEdits/">
                      <CiFacebook style={{color:'white',fontSize:35}} />
                    </Link>
                  </div>
                  <div style={{background:'transparent'}} className="social">
                    <Link style={{color:'white'}} target="_blank" href="https://www.instagram.com/flashcut.tanishq/" >
                      <FaInstagram style={{color:'white'}} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <ContactForm />
        </div>
      </div>
    </main>
  );
}
