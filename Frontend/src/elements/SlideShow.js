import * as React from 'react';
import { Box } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import gambit from "../images/gambit.jpeg";
import msmarvel from "../images/msmarvel.jpeg";
import avengers from "../images/avengers.jpeg";
import dc1 from "../images/dc1.jpg";
import dc2 from "../images/dc2.jpg";
import dc3 from "../images/dc3.png";

export default function SlideShow(props)
{
    var items = [
        {id:1, img:gambit},
        {id:2, img:msmarvel},
        {id:3, img:avengers},
        {id:4, img:dc1},
        {id:5, img:dc2},
        {id:6, img:dc3},
        
    ]

    return (
      <Box align="center" sx={{mt:2, pl:3}}>        
        <Carousel 
        cycleNavigation={true}
        navButtonsAlwaysVisible={false}
        indicators={false}
        sx={{height:425, width:825}}>
            {
                items.map( (item, i) => <CarItem key={i} item={item} /> )
            }
        </Carousel>
      </Box>
    )
}

function CarItem(props)
{
    return (
      <img 
        src={props.item.img}
        alt={props.item.book_name}
        loading="lazy"
        height="100%"
        width="100%"/>
    )
}
