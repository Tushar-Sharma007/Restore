import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import { useLazyGet400ErrorQuery, useLazyGet401ErrorQuery, useLazyGet402ErrorQuery, useLazyGet500rrorQuery, useLazyGetValidationErrorQuery } from "./errorApi";
import { useState } from "react";

export default function AboutPage() {
  const [validationError, setValidationErrors] = useState<string[]>([]);

  const [trigger400Error] = useLazyGet400ErrorQuery();
  const [trigger401Error] = useLazyGet401ErrorQuery();
  const [trigger402Error] = useLazyGet402ErrorQuery();
  const [trigger500Error] = useLazyGet500rrorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();

  const getValidationError = async () => {
    try {
      await triggerValidationError().unwrap();
    } catch (error : unknown) {
      if(error && typeof error === 'object' && 'message' in error && typeof (error as { message: string }).message === 'string') {
        const errorArray = (error as {message : string}).message.split(',');
        setValidationErrors(errorArray);
      }
      
    }
  }
  return (
    <Container maxWidth='lg'>
      <Typography gutterBottom variant='h3'>Errors for testing
        <ButtonGroup fullWidth>
          <Button variant='contained' color='primary' onClick={() => trigger400Error()
            .catch(err => console.log(err))}>
              Test 400 Error
          </Button>
          <Button variant='contained' color='primary' onClick={() => trigger401Error()
            .catch(err => console.log(err))}>
              Test 401 Error
          </Button>
          <Button variant='contained' color='primary' onClick={() => trigger402Error()
            .catch(err => console.log(err))}>
              Test 402 Error
          </Button>
          <Button variant='contained' color='primary' onClick={() => trigger500Error()
            .catch(err => console.log(err))}>
              Test 500 Error
          </Button>
          <Button variant='contained' color='primary' onClick={getValidationError}>
              Test Validation Error
          </Button>
        </ButtonGroup>
        {validationError.length > 0 && (
          <Alert severity='error'>
            <AlertTitle>Validation Errors</AlertTitle>
            <List>
              {validationError.map(err => (
                <ListItem key={err}>
                  {err}
                </ListItem>
              ))}
            </List>
          </Alert>
        )}
      </Typography>
    </Container>
  )
}