import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner'; 
import Alert from 'react-bootstrap/Alert'; 
import { useTheme } from '../../../context/ThemeContext';

function JavaCodeCompiler() {
  const { darkMode } = useTheme(); 
  const [code, setCode] = useState('');
  const [compiledCode, setCompiledCode] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Write to Start ....');
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const compileCode = async () => {
    const lang = "java";

    // Set loading to true while compiling
    setIsLoading(true);
    setStatus("Compiling....");

    try {
      const response = await fetch('https://learning-server-olive.vercel.app/api/compile', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ lang, code })
      });
      const data = await response.json();
      console.log(data);

      // Set the compiled code and clear error on success
      setCompiledCode(data.data.data.output);
      setStatus(data.message);
      setError('');
    } catch (error) {
      console.error(error);

      // Set error message on failure
      setError('An error occurred during compilation.');
      setCompiledCode('');
      setStatus("Error")
    } finally {
      // Set loading to false when compilation is finished
      setIsLoading(false);
    }
  };

  const compilerStyle = {
    height: '100vh',
    backgroundColor: darkMode ? 'rgb(52, 58, 64)' : 'rgb(171, 171, 171)',
    color: darkMode ? 'white' : 'black', 
  };

  return (
    <div style={compilerStyle} className="pb-5">
      <div className=" container text-white pt-4">
        <Card >
          <Card.Body>
            <h2 className="mb-4">Java Code Compiler</h2>
            <Form>
              <Form.Group controlId="code">
                <Form.Label>Enter Java Code: </Form.Label>
                <Form.Label className='d-flex'>Status : {status}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={code}
placeholder={`public class Main{
  public static void main(String[] args){
  //  Define Main Class
  }
}`}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className='mt-4' onClick={compileCode}>
                Compile 
              </Button>
             
            </Form>
          </Card.Body>
        </Card>

        {isLoading && (
          <div className="mt-4 text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && (
          <div className="mt-4">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}

        {compiledCode && !isLoading && (
          <div className="mt-4">
            <Card>
              <Card.Body className='success'>
                <h3>Compiled Code:</h3>
                <pre>{compiledCode}</pre>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default JavaCodeCompiler;
