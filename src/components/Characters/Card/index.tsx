import { Card, CardContent, CardHeader, CardMedia, Grid } from '@mui/material'
import cn from 'classnames'
import './index.scss'

export interface CharacterType {
  name: string
  image: string
  species: string
  gender: string
  id: number
  status: string
  type: string
}

const Character = ({
  id,
  name,
  image,
  species,
  gender,
  status,
  type,
}: CharacterType) => {
  return (
    <Card sx={{ maxWidth: 345 }} className="flip-card-outer">
      <div
        className={cn('flip-card-inner', {
          'hover-trigger': true,
        })}
      >
        <div className="card front">
          <CardHeader title={`${id}. ${name}`} subheader={species} />
          <CardMedia component="img" image={image} alt={name} />
        </div>
        <div className="card back">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                Gender
              </Grid>
              <Grid item xs={6}>
                {gender}
              </Grid>
              <Grid item xs={6}>
                Species
              </Grid>
              <Grid item xs={6}>
                {species}
              </Grid>
              <Grid item xs={6}>
                Status
              </Grid>
              <Grid item xs={6}>
                {status}
              </Grid>
              <Grid item xs={6}>
                Type
              </Grid>
              <Grid item xs={6}>
                {type}
              </Grid>
            </Grid>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}

export default Character
