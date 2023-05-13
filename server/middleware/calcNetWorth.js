const calcNetworth = (assets, userName) => {

    let netWorth = 0;

    if (assets.length == 1) {
        netWorth = assets[0].worth;
        return netWorth;
    }
    
    else {
        for (let i = 0; i < assets.length; i++) {
            netWorth += assets[i].worth;
        }

        return netWorth;
    }
}

export default calcNetworth;