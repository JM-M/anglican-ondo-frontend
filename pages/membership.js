import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Membership.module.css';
import UploadImage from '../components/UploadImage/UploadImage';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { BASE_URL as apiBaseUrl } from '../utils';

const Membership = () => {
  const [surname, setSurname] = useState('');
  const [lastName, setLastName] = useState('');
  const [otherName, setOtherName] = useState('');
  const [email, setEmail] = useState('');
  const [church, setChurch] = useState('');
  const [archdeaconry, setArchdeaconry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [society, setSociety] = useState('');
  const [roles, setRoles] = useState('');
  const [baptismalDate, setBaptismalDate] = useState('');
  const [confirmationDate, setConfirmationDate] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [weddingAnniversary, setWeddingAnniversary] = useState('');
  const [image, setImage] = useState(null);
  const [sending, setSending] = useState(false);
  const [valid, setValid] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    let membersData = new FormData();

    let id = `${surname}${uuidv4()}`;

    membersData.append('id', id);
    membersData.append('surname', surname);
    membersData.append('lastName', lastName);
    membersData.append('otherName', otherName);
    membersData.append('email', email);
    membersData.append('archdeaconry', archdeaconry);
    membersData.append('church', church);
    membersData.append('birthDate', birthDate);
    membersData.append('weddingAnniversary', weddingAnniversary);
    membersData.append('roles', roles);
    membersData.append('society', society);
    membersData.append('phoneNumber', phoneNumber);
    membersData.append('image', image);
    membersData.append('baptismalDate', baptismalDate);
    membersData.append('confirmationDate', confirmationDate);

    setSending(true);

    axios
      .post(apiBaseUrl + 'user/reg_users', membersData)
      .then((data) => {
        console.log(data);
        setSurname('');
        setLastName('');
        setOtherName('');
        setEmail('');
        setChurch('');
        setArchdeaconry('');
        setPhoneNumber('');
        setSociety('');
        setRoles('');
        setBirthDate('');
        setWeddingAnniversary('');
        setImage('');
        alert('Created Successfully');
        setSending(false);
      })
      .catch((err) => {
        alert('An Error occured');
        setSending(false);
      });
  };

  return (
    <>
      <header className={styles.Header}>
        <Head>
          <title>Membership | Anglican Diocese of Ondo</title>
          <meta
            name='description'
            content='Membership of the Anglican diocese of Ondo'
          />
          <link rel='icon' href='/images/diocese-logo.png' />
        </Head>
        <div className={styles.HeaderInner}>
          <h1 className={styles.Heading}>Membership</h1>
          <p>Register as a new member, View the list registered of members</p>
        </div>
      </header>
      <section className={styles.FormSection}>
        <div className={styles.Welcome}>
          <div className={styles.HelloText}>HELLO</div>
          <div className={styles.WelcomeText}>Welcome</div>
          <p>Register as a Member of Ondo Diocese Anglican Communion</p>
          <div className={styles.Here}>Here</div>
        </div>
        <form className={styles.Form} onSubmit={submit}>
          <h2 className={styles.FormHeading}>Register As a Member</h2>
          <UploadImage
            className={styles.UploadImage}
            file={image}
            setFile={setImage}
          />
          <input
            className={styles.Input}
            placeholder='Surname'
            value={surname}
            required
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            className={styles.Input}
            placeholder='Name'
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className={styles.Input}
            placeholder='Other Names'
            value={otherName}
            required
            onChange={(e) => setOtherName(e.target.value)}
          />
          <input
            className={styles.Input}
            placeholder='Email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.Input}
            placeholder='Church'
            value={church}
            required
            onChange={(e) => setChurch(e.target.value)}
          />
          <input
            className={styles.Input}
            placeholder='Archdeaconry'
            value={archdeaconry}
            required
            onChange={(e) => setArchdeaconry(e.target.value)}
          />
          <input
            type='number'
            className={styles.Input}
            placeholder='Phone Number'
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            className={styles.Input}
            placeholder='Society'
            value={society}
            required
            onChange={(e) => setSociety(e.target.value)}
          />
          <input
            className={styles.Input}
            placeholder='Role'
            value={roles}
            required
            onChange={(e) => setRoles(e.target.value)}
          />
          <div className={styles.Flex}>
            <div className={styles.DateInputWrapper}>
              <label className={styles.Label} htmlFor='baptismalDate'>
                Baptismal Date
              </label>
              <input
                id='baptismalDate'
                className={styles.Input}
                placeholder='DD/MM/YY'
                value={baptismalDate}
                type='date'
                //required
                onChange={(e) => setBaptismalDate(e.target.value)}
              />
            </div>
            <div className={styles.DateInputWrapper}>
              <label className={styles.Label} htmlFor='confirmationDate'>
                Confirmation Date
              </label>
              <input
                id='confirmationDate'
                className={styles.Input}
                placeholder='DD/MM/YY'
                type='date'
                //required
                value={confirmationDate}
                onChange={(e) => setConfirmationDate(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.Flex}>
            <div className={styles.DateInputWrapper}>
              <label className={styles.Label} htmlFor='birthday'>
                Birthday
              </label>
              <input
                className={styles.Input}
                placeholder='Date of birth'
                value={birthDate}
                type='date'
                required
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className={styles.DateInputWrapper}>
              <label className={styles.Label} htmlFor='weddingAnniversary'>
                Wedding anniversary
              </label>
              <input
                className={styles.Input}
                placeholder='DD/MM/YY'
                id='weddingAnniversary'
                type='date'
                //required
                value={weddingAnniversary}
                onChange={(e) => setWeddingAnniversary(e.target.value)}
              />
            </div>
          </div>
          {!sending && (
            <button type='submit' className={styles.SubmitButton}>
              Submit
            </button>
          )}
          {sending && (
            <button disabled className={styles.SubmitButton}>
              Sending
            </button>
          )}
        </form>
      </section>
    </>
  );
};

export default Membership;
