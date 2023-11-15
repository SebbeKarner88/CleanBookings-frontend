import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from '@react-email/components'
import logo from '../../assets/images/logo.png'

export const Email = () => {
    return (
        <Html lang='sv' dir='ltr'>
            <Head />
            <Preview>Förhandsvisning av mejlet i användarens inkorg här</Preview>
            <Body>
                <Container className='d-flex justify-content-center'>
                    <Section className='bg-beige '>
                        <Img src={logo} />
                    </Section>
                    <Container className='bg-beige'>
                        {/* MAILETS HUVUDINNEHÅLL HÄR NEDAN */}
                        <Heading as='h3' className='mt-3 '>Hej kundens-namn!</Heading>
                        <Text>
                            Du har bokat följade ...
                            Ayo
                        </Text>
                        <Heading as='h6'>Allt gott, <br />
                            StädaFint Ab</Heading>
                        <Link
                            href='/login'
                            style={{ color: 'var(--dark-purple)', fontWeight: 'bold' }}>
                            GÅ TILL MINA SIDOR
                        </Link>
                    </Container>
                </Container>
            </Body>
        </Html>
    )
}