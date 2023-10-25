import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import '../styles/Products.css'
import { Footer } from "../common/Footer";
import NavBar from "../common/NavBar";

const Products = () => {
    const [ expandedIndex, setExpandedIndex ] = useState<number | null>(0)
    const cleaningProducts = [
        {
            name: 'Allrent',
            desc: 'Allrent är en mångsidig rengöringslösning som är utformad för att göra ditt hem skinande rent. Den kan användas på alla ytor och tar bort smuts, fläckar och oönskad beläggning. En sann allt-i-ett-lösning, samtidigt som den är mild och skonsam.',
            content: 'Allrent innehåller en kombination av ekologiska enzymer och milda rengöringsmedel som effektivt bryter ned smuts och fläckar. Den har också en fräsch doft av citrus och lavendel.'
        },
        {
            name: 'Såpa',
            desc: ' Såpa är en traditionell rengöringsprodukt som är perfekt för rengöring av golv och ytor i ditt hem. Den är känd för sin naturliga och milda rengöringskraft, samtidigt som den ger en fräsch och ren doft.',
            content: 'Såpa är gjord av naturliga ingredienser, såsom vegetabilisk olja och lut, och är fri från hårda kemikalier. Den innehåller också eteriska oljor från lavendel och citron för en frisk doft.'
        },
        {
            name: 'Diskmedel',
            desc: 'Diskmedlet är speciellt utformat för att effektivt avlägsna fett och matrester från dina tallrikar och bestick. Det ger en skinande ren finish och är skonsamt för händerna.',
            content: 'Diskmedlet innehåller en kraftfull kombination av ytaktiva ämnen och doftämnen. Det är pH-neutralt och innehåller aloe vera-extrakt för att vårda och återfukta dina händer.'
        },
        {
            name: 'WC Rent',
            desc: ' WC Rent är en specialdesignad rengöringsprodukt för toaletter. Den tar bort kalkavlagringar, smuts och obehagliga dofter, vilket ger en fräsch och hygienisk toalett.',
            content: 'WC Rent innehåller syror och desinfektionsmedel som effektivt bryter ned kalkavlagringar och bakterier. Den har också en frisk doft av eukalyptus och mint.'
        },
        {
            name: 'Skurkräm',
            desc: 'Skurkrämen är en kraftfull rengöringsprodukt för hårda ytor som kakel, porslin och stål. Den tar bort envis smuts och ger en skinande ren yta.',
            content: 'Skurkrämen innehåller slipmedel och rengöringsämnen som effektivt tar bort fläckar och beläggningar. Den har en mild doft av citron och innehåller inga hårda kemikalier.'
        },
        {
            name: 'Universalpasta',
            desc: 'Universalpasta är en allomfattande rengöringspasta som kan användas för att rengöra och polera olika ytor i ditt hem. Den ger en djup rengöring och glans.',
            content: 'Universalpastan innehåller en unik blandning av mikroskopiska rengöringspartiklar och naturliga vaxer. Den är skonsam för de flesta ytor och ger en skyddande yta med långvarig glans.'
        }
    ]

    const handleClick = (index: number) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    }

    return (
        <>
            <NavBar />
            <div className="bg-image min-vw-100 py-4 text-start">
                <h1 className="fw-bold my-4 mx-2 text-center text-white">Vanliga frågor</h1>
                <div className="container bg-light-brown p-5 rounded rounded-4 shadow mb-5 mt-5">
                    <div className="products-info">
                        <h2 className="products-header">EcoClean</h2>
                        EcoClean-kollektionen är en serie högkvalitativa rengöringsprodukter som är skapade för att göra ditt hem skinande rent och välvårdat. Varje produkt i kollektionen har utvecklats med fokus på effektiv rengöring, omsorg om miljön och din hälsa. De innehåller naturliga ingredienser, är miljövänliga och har en mild doft som gör städningen till en fröjd. Med EcoClean-kollektionen kan du njuta av en skinande ren och välbehållen bostad samtidigt som du tar hand om vår värld.
                    </div>
                    {cleaningProducts.map((product, index) => (
                        <div key={index}>
                            <h4 className="product-name">{product.name}</h4>
                            <p className="product-desc">{product.desc}</p>
                            <button
                                type="button"
                                className='product-content'
                                onClick={() => handleClick(index)}
                                aria-label={`${product.name} (Tryck på knappen för att expandera/minimera)`}
                            >
                                {'Innehåll'} {
                                    index === expandedIndex
                                        ? <ArrowDropUpIcon />
                                        : <ArrowDropDownIcon />
                                }
                            </button>
                            {expandedIndex === index && <div className='product-content-div'>{product.content}</div>}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Products