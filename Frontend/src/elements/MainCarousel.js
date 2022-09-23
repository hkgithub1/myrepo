import React from "react";
import Carousel from "react-material-ui-carousel";

export default function MainCarousel(props)
{
    var carouselImages = [];
    if(props.first_image) {
        carouselImages.push({img:props.first_image})
    }
    if(props.second_image) {
        carouselImages.push({img:props.second_image})
    }
    if(props.third_image) {
        carouselImages.push({img:props.third_image})
    }
    if(props.fourth_image) {
        carouselImages.push({img:props.fourth_image})
    }
    if(props.fifth_image) {
        carouselImages.push({img:props.fifth_image})
    }
    if(props.sixth_image) {
        carouselImages.push({img:props.sixth_image})
    }
    if(props.seventh_image) {
        carouselImages.push({img:props.seventh_image})
    }
    if(props.eighth_image) {
        carouselImages.push({img:props.eighth_image})
    }
    

    return (       
        <Carousel
            navButtonsAlwaysVisible={true}
            cycleNavigation={true}
            indicators={false}
            autoPlay={false}
            sx={{height:600, width:1000}}


            navButtonsProps={{ 
                    style: {
                    backgroundColor: "gray",
                    borderRadius: 1,
                    }}}   
            navButtonsWrapperProps={{   
                    style: {
                    }}}


            indicatorIconButtonProps={{
                    style: {
                    padding: "2px",
                    color: "gray"}}}
            activeIndicatorIconButtonProps={{
                    style: {
                    backgroundColor: "cornflowerblue"}}}
            /*indicatorContainerProps={{
                    style: {
                    zIndex: 1,
                    marginTop: "-40px",
                    position: "relative",
                    textAlign:"center"}}}*/           
        >
            {
                carouselImages.map( (item, i) => <CarItem key={i} item={item} /> )
            }
        </Carousel>
    )
}

function CarItem(props)
{
    return (
      <img 
        src={require("../images/"+props.item.img+".jpg")}
        alt={props.item.book_name}
        loading="lazy"
        height="100%"
        width="100%"/>
    )
}
