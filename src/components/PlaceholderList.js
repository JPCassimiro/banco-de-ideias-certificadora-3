import React from "react";

const PlaceholderList =  ({ ideasList }) => {
    console.log("placeholder",ideasList)
    if ((ideasList !== null) || (ideasList !== undefined)) {
        return <ul title="PLACEHOLDERLIST">{ideasList}</ul>;
    } else {
        return (<div></div>);
    }
}

export default PlaceholderList