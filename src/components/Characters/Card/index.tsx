import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material'
import cn from 'classnames'
import './index.scss'

export interface CharacterType {
  name: string
  image: string
  species: string
  gender: string
  id: number
}

const Character = ({ id, name, image, species, gender }: CharacterType) => {
  return (
    <Card sx={{ maxWidth: 345 }} className="flip-card-outer">
      <div
        className={cn('flip-card-inner', {
          'hover-trigger': true,
        })}
      >
        <div className="card front">
          <CardHeader title={name} subheader={species} />
          <CardMedia component="img" height="194" image={image} alt={name} />
        </div>
        <div className="card back">
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Gender:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {gender}
            </Typography>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}

export default Character
