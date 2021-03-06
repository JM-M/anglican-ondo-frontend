import { useState } from 'react';
import UploadImage from '../../components/UploadImage/UploadImage';
import AutoGrowingTextarea from '../../components/AutoGrowingTextarea/AutoGrowingTextarea';
import styles from '../../styles/AdminNews.module.css';
import { FaNewspaper as NewsIcon } from 'react-icons/fa';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import FormError from '../../components/FormError/FormError';
import { v4 as uuidv4 } from 'uuid';

const News = ({ admin, authToken, apiBaseUrl }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState();
  const [location, setLocation] = useState('Ondo - test');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    let formData = new FormData();

    let id = `${title}${uuidv4()}`;

    formData.append('id', id);
    formData.append('title', title);
    formData.append('details', details);
    formData.append('image', image);
    formData.append('location', location);

    const res = await axios
      .post(apiBaseUrl + 'create/news', formData, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((data) => {
        setTitle('');
        setDetails('');
        setImage('');
        setLocation('');
        alert('Created Successfully');
        setSaving(false);
      })
      .catch((err) => {
        setSaving(false);
        alert('An Error occured');
      });

    // check if server returned an error
    const error = false;

    if (error) {
      // set the error message
      setError(error);
    }

    setSaving(false);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.HeadingContainer}>
        <h1 className={styles.Heading}>
          <NewsIcon size='50px' className={styles.HeadingIcon} />
          News
        </h1>
      </div>
      <form onSubmit={submit} method='POST' encType='multipart/form-data'>
        <div className={styles.FormInner}>
          <UploadImage
            file={image}
            setFile={setImage}
            name='image'
            className={styles.UploadImage}
          />
          <div className={styles.TextContainer}>
            <input
              className={styles.Title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='News Title'
              name='title'
            />
            <AutoGrowingTextarea
              className={styles.AutoTextareaWrapper}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder='News Details'
              name='details'
            />
          </div>
        </div>
        <FormError error={error} />
        <button type='submit' className={styles.SubmitButton} disabled={saving}>
          {saving ? <Spinner /> : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default News;
