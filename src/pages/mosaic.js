import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-awesome-styled-grid';

import DefaultOneCol from 'components/DefaultOneCol';
import Mosaic from 'components/Mosaic';
import Link from 'components/Link';

const StyledContainer = styled(Container)`
    margin: 0 auto; 
`;

export const MosaicPage = () => (
    <main>
        <DefaultOneCol>
            <h1>Image mosaic on a canvas</h1>
            <Mosaic />
        </DefaultOneCol>
        <DefaultOneCol>
            <StyledContainer>
                <Row>
                    <Col xs={4} lg={4}>
                        <p>
                            This project has four main parts:
                        </p>
                        <ul>
                            <li>
                                <strong>The map,</strong> which I've been creating since the year 2018 in standard 3" x 5" index cards. The map itself is a passion project inspired by <Link as="a" href="http://www.jerrysmap.com/">Jerry's Map.</Link>
                                <br /><br />
                                The map had grown too large to be manageable, so I wanted to create a way to display it without using a good chunk of my small studio apartment.
                                <br /><br />
                            </li>
                            <li>
                                <strong>The scanning process.</strong> I got myself a <Link as="a" href="https://www.usa.canon.com/internet/portal/us/home/products/details/scanners/photo-scanner/canoscan-lide-220">scanner</Link> and started scanning each one of the ~200 map pieces.
                                <br /><br />
                                I had to come up with a standard way of doing this, both for speed and to get somewhat uniform results. The scanner would tend to crop the card edges (there's no <Link as="a" href="https://web.printingcenterusa.com/blog/what-is-full-bleed-printing">bleed</Link> spacing in them!); this was solved via settings in Windows 10's Scan application.
                                <br /><br />
                                The result would be .png files of <em>about</em>1500x900 pixels, around 400kb each.
                                <br /><br />
                            </li>
                            <li>
                                <strong>Compression.</strong> Those file sizes worked if displaying one mosaic "tile" at a time, but not all at once. I ended up creating a smaller copy of each tile using Python and its <Link as="a" href="https://pillow.readthedocs.io/">Pillow</Link> library.
                                <br /><br />
                                At this point I'm left with two sets of images: the originals and "thumbs", each thumb measuring no more than 8kb.
                                <br /><br />
                            </li>
                            <li>
                                <strong>The Mosaic display,</strong> which you can see at the top of this page.
                                <br /><br />
                                I had no real experience with canvas. After evaluating a number of libraries, I went with the one that would enable me to put tile images in a grid the fastest. This ended up being <Link as="a" href="http://fabricjs.com/">Fabric</Link>.
                                <br /><br />
                                Fabric allows for powerful abstractions to manage "objects" inside the canvas plus a great number of utilities. It is not very React-friendly out of the box, but a wrapper was created inspired on <Link as="a" href="https://stackoverflow.com/questions/37565041/how-can-i-use-fabric-js-with-react">this ReactOverflow answer.</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={4} lg={4}>
                        <p>
                            Este proyecto tiene cuatro partes principales:
                        </p>
                        <ul>
                            <li>
                                <strong>El mapa como tal,</strong> el cual he venido creando desde el 2018 en tarjetas "&iacute;ndice" de tama&ntilde;o est&aacute;ndar de 3" x 5" pulgadas. Este es un proyecto inspirado por <Link as="a" href="http://www.jerrysmap.com/">Jerry's Map.</Link>
                                <br /><br />
                                Cuando el mapa se volvi&oacute; demasiado grande para su f&aacute;cil manejo, comenc&eacute; a pensar en maneras de desplegarlo completo sin ocupar buena parte del piso de mi peque&ntilde;o departamento.
                                <br /><br />
                            </li>
                            <li>
                                <strong>El proceso de escaneo.</strong> Me hice de un <Link as="a" href="https://www.usa.canon.com/internet/portal/us/home/products/details/scanners/photo-scanner/canoscan-lide-220">esc&aacute;ner</Link> y comenc&eacute; a procesar cada una de las ~200 partes del mapa.
                                <br /><br />
                                Tuve que estandarizar este proceso, tanto para hacerlo r&aacute;pido como para obtener resultados relativamente uniformes. El esc&aacute;ner tend&iacute;a a ignorar los border de las tarjetas (&iexcl;dado que no tienen espacio de <Link as="a" href="https://dospuntocero.cl/que-es-el-sangrado-bleeding/">sangrado</Link>!); esto fue resuelto mediante configuraciones en la aplicaci&oacute;n Scan de Windows 10.
                                <br /><br />
                                El resultado fueron archivos .png de <em>alrededor</em> de 1500x900 pixeles, midiendo como 400kb cada uno.
                                <br /><br />
                            </li>
                            <li>
                                <strong>Compresi&oacute;n.</strong> Esos tama&ntilde;os funcionan bien si se muestra una pieza del mapa (una imagen) a la vez, pero no todas al mismo tiempo. Termin&eacute; haciendo una copia m&aacute;s peque&ntilde;a de cada imagen usando Python y su biblioteca <Link as="a" href="https://pillow.readthedocs.io/">Pillow</Link>.
                                <br /><br />
                                Para este punto tengo dos juegos de im&aacute;genes: las originales y "muestras" (<em>thumbs</em>, de "thumbnails"); cada muestra no mide m&aacute;s de 8kb.
                                <br /><br />
                            </li>
                            <li>
                                <strong>El mosaico,</strong> el cual puedes ver al inicio de esta p&aacute;gina.
                                <br /><br />
                                No ten&iacute;a gran experiencia con el canvas. Tras evaluar algunas bibliotecas, eleg&iacute; la que me permiti&oacute; acomodar las im&aacute;genes en una cuadr&iacute;cula lo antes posible. La elecci&oacute;n termin&oacute; siendo <Link as="a" href="http://fabricjs.com/">Fabric</Link>.
                                <br /><br />
                                Fabric usa poderosas abstracciones para manejar "objetos" dentro del canvas e incluye un gran n&uacute;mero de utiler&iacute;as. La biblioteca como tal no trabaja muy bien con React, por lo que hice un <em>wrapper</em> basado en <Link as="a" href="https://stackoverflow.com/questions/37565041/how-can-i-use-fabric-js-with-react">esta respuesta de ReactOverflow.</Link>
                            </li>
                        </ul>                    
                    </Col>
                </Row>
            </StyledContainer>
        </DefaultOneCol>
    </main>
);

export default MosaicPage;