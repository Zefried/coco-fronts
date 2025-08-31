// AboutUs.js
import React from 'react';
import Header from '../../Layout/Header/Header';
import Footer from '../../Layout/Footer/Footer';
import './About.css';
import AboutLogo from '../../../assets/img/Logo/About/aboutLogo.jpg';

const AboutUs = () => {
    return (
        <div className="about-container">
            <Header />
            
            <div className="about-content">
                <div className="about-header">
                    <h1 className="about-title">About Sunclay</h1>
                    <p className="about-subtitle">A little heart to heart</p>
                </div>
                
                <div className="about-section">
                    <img src={AboutLogo} style={{height:'200px', width:'200px'}} alt="About Sunclay" className="about-image" />
                    <p className="about-intro">
                        Hi, my name is Kakoli Deka and I am the creator behind Sunclay studio. I'm currently based in Guwahati city in India. 
                        I work alone and often times quietly with my hands and spirit. I don't plan things out in advance and go with what I'm called to do. 
                        I still haven't perfected anything and all I do is try. All Glory to God with my utmost reverence.
                    </p>
                </div>
                
                <div className="about-section">
                    <p>
                        More often than not you can expect to see me either working tirelessly or taking naps for a whole week. 
                        Going out into the nature, on the street to a street vendor, petting a cat, talking to birds the hills, mountains, 
                        beach, sand, shells are all inspiration for me, listening for words spoken in languages yet unknown to humans. 
                        I am inclined towards being like a pendulum that can swing from one extreme to the other, like two sides of a coin 
                        my strength and my weakness.
                    </p>
                </div>
                
                <div className="about-section">
                    <p>
                        I make my clay creations in small batches and focus on patience, silence and a movement going inward, while my 
                        heart is radiating outward to the clay in-front of me and ultimately to you, the one I connect with on all levels. 
                        Thank you for being here. Your presence means the world to me and even more that is limitlessly boundless 
                        strengthening and supporting me.
                    </p>
                </div>
                
                <div className="about-section">
                    <p>
                        I like to teach myself the way which is inseparable from me, because the way is here to teach me.
                    </p>
                </div>
                
                <div className="about-section">
                    <p>
                        My creations speak of colour, celebrates nature, love for each other and everything around us, and also being 
                        aware of something greater than us that is the entire cosmos. They are in a way here to be a support system for you, 
                        to help you go about your day in a joyful way. I can tell you that because they are holding me too and their gift to 
                        me is my gift to you. Gifting is one of my biggest love languages.
                    </p>
                </div>
                
                <div className="about-section">
                    <p>
                        I love making things that are functional, that can be held, felt, seen and loved everyday. Having pops of colour 
                        in unexpected places is what I like to bring to the table because I know that there are also sunlit places all 
                        around the world even in wilderness and in silence.
                    </p>
                </div>
                
                <div className="about-section">
                    <p>
                        Ideas like to be recycled and I also get inspiration from ideas that are around me. I want to stay true to myself 
                        by praying for guidance and giving thanks for all things.
                    </p>
                </div>
                
                <div className="about-section">
                    <p>
                        Often times things feel slow for breakthroughs and miracles to happen and many go back to the rhythms of bondage 
                        because one understands chains better than freedom that is in light and love.
                    </p>
                </div>
                
                <div className="about-quote">
                    <p>"Know that things are always happening right on time. Know that it's always good to be kind, to be in love and to love above all else."</p>
                    <p className="quote-caption">These are the types of memos I like to keep in my front pocket.</p>
                </div>
                
                <div className="about-section">
                    <p>
                        I like to be mouldable just like clay would to a potter.
                    </p>
                </div>
                
                <div className="about-section">
                    <p>
                        I want to feel and process my emotions and have fun doing it, hoping it would mould and manifest into some kind 
                        of me that's my art. I wear my heart on my sleeves. I'm not afraid to be willing and open. I hope for my art to 
                        look like that :)
                    </p>
                </div>
                
                <div className="about-section">
                    <p>
                        Maybe someday I'll write to you on my blogs about how I got started with pottery and what is coming in the 
                        subsequent days and add a picture of me on the website but for now, I'd like to take a moment for my pottery to 
                        speak for itself. So the centre stage goes to Sun the creator, the sustainer and the destroyer of all shadow. 
                        Also that being said, there is no other moment like this moment. The one in the present is the one where we both 
                        are, so do take a deep breathe and spend some time holding a warm tea cup on a cold day, or eat some ice cream 
                        out of a dessert bowl just because you're living this awesome life and you're alive.
                    </p>
                </div>
                
                <div className="about-section">
                    <p>
                        I'd like to keep creating as long as my existence holds and that, a part of me being a human could have only been 
                        fulfilled by this art form among other things that are playful and loving fun.
                    </p>
                </div>
                
                <div className="about-section">
                    <p>
                        The journey so far continues to make me fall in love over and over again. Not to the destination that is to what 
                        I have reached but for all the times I was sure of love and I was thankful for having these opportunities to know 
                        God better, to feel life and to actually live life. To share moments that couldn't be written down but only felt.
                    </p>
                </div>
                
                <div className="about-section">
                    <p>
                        I tell myself, this is just the beginning and indeed it is.
                    </p>
                </div>
                
                <div className="about-section">
                    <p>
                        I want to keep creating and continue to pursue my dream as a potter, ceramicist and an artist. By supporting my 
                        small business you are supporting my dream for that my respect for is on a whole another level. Trust me, it's 
                        waaayy up there in positive light. Please know that It makes me happy to be alive and on this journey with you 
                        and this I pray that my happiness and my good feelings be transferred to you as you continue to live alongside art, 
                        my pottery being one of them, around you. I really hope you like what I've created and that in some way my clay 
                        creations adds value to your life. That is my wish going forward with this passion project.
                    </p>
                </div>
                
                <div className="about-closing">
                    <p>
                        Lastly, I hope for good health for your body, courage for you heart and freedom for your soul. 
                        Take care, I wish you love, light and good luck.
                    </p>
                </div>
                
                <div className="about-signature">
                    <p>With love and gratitude,</p>
                    <p className="signature-name">Kakoli Deka</p>
                    <p className="signature-title">Creator, Sunclay Studio</p>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default AboutUs;