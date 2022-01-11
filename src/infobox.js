import { Card, Typography,CardContent } from '@material-ui/core'
import React from 'react'


function infobox({title, cases, total}) {
    return (
        <Card>
            <CardContent>
                {/*Coronavirus cases */}
                <Typography className="infobox__title"color="textSecondary">{title}</Typography> 
                {/*Number of cases*/}
                <h2 className="infobox__cases">{cases}</h2>
                {/*Total*/}
                <Typography className="infobox__total"color="textSecondary">{total}</Typography>

            </CardContent>
        </Card>
    )
}

export default infobox
