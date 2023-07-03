import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { database, ref, set } from "../../firebase";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./update.scss";

function Update() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [id, setID] = useState(state.id);
    const [name, setName] = useState(state.name);
    const [email, setEmail] = useState(state.email);
    const [dateOfBirth, setDateOfBirth] = useState(state.dob);
    const [gender, setGender] = useState(state.gender);
    const [income, setIncome] = useState(state.income);
    const [loan, setLoan] = useState(state.loan);
    const [totalAcc, setTotalAcc] = useState(state.totalAcc);
    const [stateOfOrigin, setStateOfOrigin] = useState(state.stateOfOrigin);
    const [pollingUnit, setPollingUnit] = useState(state.pollingUnit);
    const [err, setErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useContext(UserContext);
    const notAuthorized = user !== "NIMC";
    const notCBN = user !== "CBN";
    const notINEC = user !== "INEC";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function writeUserData(id, name, email, dateOfBirth, gender, income, stateOfOrigin, loan='--', totalAcc='--', pollingUnit='--') {
        console.log(id, name, email, dateOfBirth, gender, income, stateOfOrigin, loan, totalAcc, pollingUnit);
        set(ref(database, "registeredUsers/" + id), {
            id: id,
            name: name,
            email: email,
            dob: dateOfBirth,
            gender,
            income,
            stateOfOrigin,
            loan,
            totalAcc,
            pollingUnit,
        });
    }

    const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
    ];

    const handleGoBack = () => {
        navigate("/user", {
            state: {
                id: state.id,
                name: name,
                email: email,
                dob: dateOfBirth,
                gender,
                income,
                loan,
                stateOfOrigin,
                totalAcc,
                pollingUnit
            },
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = {
            id,
            name,
            email,
            dateOfBirth,
            gender,
            income,
            stateOfOrigin,
            loan,
            totalAcc,
            pollingUnit,
        };

        try {

            writeUserData(
                formData.id,
                formData.name,
                formData.email,
                formData.dateOfBirth,
                formData.gender,
                formData.income,
                formData.stateOfOrigin,
                formData.loan,
                formData.totalAcc,
                formData.pollingUnit,
            );

            setErr("User updated successfully");
        } catch (err) {
            setErr(err);
        } finally {
            setIsLoading(false);
            navigate("/user", {
                state: {
                    id: state.id,
                    name: name,
                    email: email,
                    dob: dateOfBirth,
                    gender,
                    income,
                    loan,
                    stateOfOrigin,
                    totalAcc,
                    pollingUnit
                },
            });
        }
    };

    return (
        <>
            <h1 style={{ textAlign: "center", paddingTop: "20px" }}>Update Data</h1>
            <div className='update-wrapper'>
                <Form onSubmit={handleUpdate}>
                    <Form.Group as={Row} controlId='id'>
                        <Form.Label column sm={2}>
                            ID
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                disabled
                                type='text'
                                value={id}
                                onChange={(e) => setID(e.target.value)}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='name'>
                        <Form.Label column sm={2}>
                            Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                disabled={notAuthorized}
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='email'>
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                disabled={notAuthorized}
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='dateOfBirth'>
                        <Form.Label column sm={2}>
                            Date of Birth
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type='date'
                                disabled={notAuthorized}
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='gender'>
                        <Form.Label column sm={2}>
                            Gender
                        </Form.Label>
                        <Col sm={10}>
                            {genderOptions.map((option) => (
                                <Form.Check
                                    key={option.value}
                                    disabled={notAuthorized}
                                    inline
                                    label={option.label}
                                    type='radio'
                                    name='gender'
                                    value={option.value}
                                    checked={gender === option.value}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                            ))}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='stateOfOrigin'>
                        <Form.Label column sm={2}>
                            State of Origin
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type='text'
                                disabled={notAuthorized}
                                value={stateOfOrigin}
                                onChange={(e) => setStateOfOrigin(e.target.value)}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='income'>
                        <Form.Label column sm={2}>
                            Income
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type='text'
                                disabled={notCBN}
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='noOfAcc'>
                        <Form.Label column sm={2}>
                            No Of Accounts Owned
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                disabled={notCBN}
                                type='text'
                                value={totalAcc}
                                onChange={(e) => setTotalAcc(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='loan'>
                        <Form.Label column sm={2}>
                            Total Loan
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                disabled={notCBN}
                                type='text'
                                value={loan}
                                onChange={(e) => setLoan(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='pollingUnit'>
                        <Form.Label column sm={2}>
                            Polling Unit
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                disabled={notINEC}
                                type='text'
                                value={pollingUnit || "--"}
                                onChange={(e) => setPollingUnit(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    {err && (
                        <div className='center-div'>
                            <p>{err}</p>
                        </div>
                    )}

                    <div className='button-container center-div'>
                        <button onClick={handleGoBack}>Back</button>
                        <Button type='submit' disabled={isLoading}>
                            {isLoading ? "Loading..." : "Update"}
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default Update;
