import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { Avatar, Box, IconButton } from '@mui/material'
import defaultImageUrl from 'src/assets/images/Design.png'
import React, { useEffect, useState } from 'react'

type Props = {
  isEditable: boolean
  imageUrl?: string
  onChange?: (newImage: File) => void
  size?: [number, number]
  showEditIcon?: boolean
}

const PfpComponent = ({
  isEditable,
  imageUrl = defaultImageUrl,
  onChange,
  size = [110, 110],
  showEditIcon = true,
}: Props) => {
  const [image, setImage] = useState(imageUrl)
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    if (imageFile) {
      const newImageUrl = URL.createObjectURL(imageFile)
      setImage(newImageUrl)
    } else {
      setImage(imageUrl)
    }
  }, [imageFile, imageUrl])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setImageFile(file)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(file)
    }
  }

  return (
    <Box
      sx={{
        width: size[0],
        height: size[1],
        position: 'relative',
      }}
    >
      {isEditable ? (
        <IconButton
          component="label"
          sx={{ padding: 0, width: '100%', height: '100%' }}
        >
          <Avatar src={image} sx={{ width: size[0], height: size[1] }} />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </IconButton>
      ) : (
        <Avatar src={image} sx={{ width: size[0], height: size[1] }} />
      )}
      {isEditable && showEditIcon && (
        <IconButton
          color="primary"
          component="label"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: 'white',
            boxShadow: '0px 5px 7.8px 0px #00000040',
            '&:hover': {
              backgroundColor: 'white',
            },
          }}
        >
          <CameraAltIcon fontSize="small" sx={{ color: 'black' }} />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </IconButton>
      )}
    </Box>
  )
}

export default PfpComponent
