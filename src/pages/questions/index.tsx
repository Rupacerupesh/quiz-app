// ** MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const Questions = () => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant='h5'>Questions</Typography>
      </Grid>
      <Grid marginTop={4}>
        <iframe width='100%' height='600' src={process.env.NEXT_PUBLIC_IFRAME_URL}></iframe>
      </Grid>
    </>
  )
}

export default Questions
