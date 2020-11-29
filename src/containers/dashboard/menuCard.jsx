import React from 'react';
import {
    Avatar,
    Grid,
    Card,
    CardContent,
    colors,
    Typography
  } from '@material-ui/core';
export const MenuCard = ({menuLabel, menuIcon, menuClick}) => {

    return (

        <Grid
        item
        lg={4}
        sm={6}
        xl={12}
        xs={18}
        onClick={() => menuClick()}
      >
            <Card
  >
    <CardContent>
      <Grid
        container
        justify="space-between"
        spacing={3}
      >

<Grid item>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {menuLabel}
          </Typography>
        </Grid>
          <Grid item>
          <Avatar style={{  backgroundColor: colors.red[600],
  height: 56,
  width: 56 }}>
            {menuIcon}
          </Avatar>
        </Grid>
          </Grid>
          </CardContent>
          </Card>

          </Grid>

    )
}