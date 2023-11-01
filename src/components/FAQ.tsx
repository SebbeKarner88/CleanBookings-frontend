import { useState } from 'react';
import NavBar from '../common/NavBar';
import '../styles/FAQ.css'
import { Footer } from '../common/Footer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import bottles from '../assets/images/bottles.jpg'
import product from '../assets/images/product.jpg'
import bathroom from '../assets/images/bathroom.jpg'
import broom from '../assets/images/broom.jpg'

function FAQ() {
    const [ expandedIndex, setExpandedIndex ] = useState<number | null>(0);
    const faqs = [
        {
            question: 'Hur ofta borde jag boka en städservice?',
            answer: 'Det beror på många olika faktorer så som storleken på ditt hem eller din fastighet, nivån av aktivitet och dina personliga preferenser för renlighet. De flesta kunder tycker att städservice varannan vecka hjälper dem att hålla sitt hem snyggt och prydligt.'
        },
        {
            question: 'Hur bokar jag en städservice hos er?',
            answer: 'Du kan boka våra tjänster online via vår webbsida genom att klicka på "Våra tjänster" i menyn högst upp. Välj den typ av tjänst som passar dig bäst, bestäm datum och tid för när tjänsten ska utföras och fyll i dina personliga uppgifter.'
        },
        {
            question: 'Hur ser er avbokningspolicy ut?',
            answer: 'Du kan avboka din städning utan kostnad upp till 48 timmar innan den bokade tiden. Om bokningen sker senare än så kommer du debiteras en avbokningsavgift.'
        },
        {
            question: 'Vad bör jag göra för att förbereda min bostad/fastighet innan bokad service?',
            answer: 'Plocka bort lösa föremål från golv och andra ytor. Om det finns specifika ytor du vill att vi ska fokusera på eller om det finns känsliga material eller områden, var vänlig och låt oss veta i förväg.'
        },
        {
            question: 'Behöver jag bistå med rengöringsprodukter eller redskap?',
            answer: 'Nej, vår personal tar med sig allt som de kan tänkas behöva. Finns det däremot önskemål på specifika produkter du vill att vi använder behöver du meddela oss i förväg.'
        },
        {
            question: 'Är era rengöringsprodukter säkra för barn och djur?',
            answer: 'Ja. Vi använder miljövänliga produkter som är säkra för barn och djur. Vi vill bidra till en sund miljöhållning i samband med våra städtjänster.'
        },
        {
            question: 'Hur kan jag vara trygg i att min bostad/fastighet är i säkra händer?',
            answer: 'Vi värdesätter våra kunders förtroende och varje medarbetare måste genomgå grundlig bakgrundskoll och upplärning för att säkerställa er trygghet.'
        },
        {
            question: 'Var kan jag delge er om mina specifika önskemål gällande städning, val av produkter eller annat?',
            answer: 'Du kan skicka med ett meddelande när du bokar en tjänst online eller kontakta oss via telefon, mail eller kontaktforumuläret. Du hittar alla våra kontaktuppgifter nedan.'
        }
    ];


    const handleClick = (index: number) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <>
            <NavBar />
            <div className="bg-image min-vw-100 py-4 text-start">
                <h1 className="fw-bold my-4 mx-2 text-center text-white">Vanliga frågor</h1>
                <div className="container bg-light-brown p-5 rounded rounded-4 shadow mb-5 mt-5 text-center">
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <button
                                type="button"
                                className='faq-question'
                                onClick={() => handleClick(index)}
                                aria-label={`${faq.question} (Tryck på knappen för att expandera/minimera)`}
                            >
                                {faq.question} {
                                    index === expandedIndex
                                        ? <ArrowDropUpIcon />
                                        : <ArrowDropDownIcon />
                                }
                            </button>
                            {expandedIndex === index && <div className='faq-answer'>{faq.answer}</div>}
                            <hr id='line' />
                        </div>
                    ))}
                    <div className="container text-center my-4 p-5">
                        <div className="row">
                            <div className="col">
                                <img src={bottles} className="img-fluid rounded" alt="Städbild" />
                            </div>
                            <div className="col">
                                <img src={product} className="img-fluid rounded" alt="Städbild" />
                            </div>
                            <div className="col">
                                <img src={broom} className="img-fluid rounded" alt="Städbild" />
                            </div>
                            <div className="col">
                                <img src={bathroom} className="img-fluid rounded" alt="Städbild" />
                            </div>
                        </div>
                    </div>
                    <LinkContainer to="/contact">
                        <Button variant="dark" size="lg" className="btn-dark-purple mb-3 my-2">
                            Kontakta oss
                        </Button>
                    </LinkContainer>


                </div>
            </div>
            <Footer />
        </>
    );
}

export default FAQ;
