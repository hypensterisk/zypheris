import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import useDatabaseStore from "../../hooks/useDatabaseStore";

export default function Upload() {
  const setDatabase = useDatabaseStore((state) => state.setDatabase);
  const setName = useDatabaseStore((state) => state.setName);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    if (file === null) return;
    setDatabase(await file.text());
    setName(file.name);
    navigate("/unlock");
  }
  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center p-3 gap-4">
      <div className="text-center">
        <h1>Upload Database</h1>
        <h2 className="text-muted lead">
          Please select the database file to be uploaded.
        </h2>
      </div>
      <Form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
        <InputGroup>
          <Form.Control
            accept="*.db"
            onChange={({ target }) => setFile(target.files[0])}
            type="file"
          />
        </InputGroup>
        <Button disabled={!file} type="submit" variant="success">
          <i className="fa-solid fa-upload" /> Upload Database
        </Button>
        <Button as={Link} to=".." path="relative" variant="outline-light">
          <i className="fa-solid fa-arrow-left" /> Back
        </Button>
      </Form>
    </div>
  );
}
