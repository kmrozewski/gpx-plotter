//based on https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { isExtension, isFilesCount, isEachFileSize, isTotalSize } from './FileValidator.js'
import { FIFTEEN_MB } from '../../global/consts.js'


export default function Upload() {
	const [form, setForm] = useState({})
	const [errors, setErrors] = useState({})

	const setField = (field, value) => {
		setForm({
			...form,
			[field]: value
		})

		// Check and see if errors exist, and remove them from the error object:
		if (!!errors[field]) setErrors({
			...errors,
			[field]: null
		})
	}

	const findFormErrors = () => {
		const { uploadedFiles } = form
		const newErrors = {}

		if (!uploadedFiles || !isExtension(uploadedFiles, ["gpx"])) newErrors.isExtension = 'Only GPX files are allowed'
		if (!uploadedFiles || !isFilesCount(uploadedFiles, 1, 10)) newErrors.isFilesCount = 'You can select up to 10 files'
		if (!uploadedFiles || !isEachFileSize(uploadedFiles, 0, FIFTEEN_MB)) newErrors.isEachFileSize = 'Each file must not be larger than 15 MB'
		if (!uploadedFiles || !isTotalSize(uploadedFiles, 0, 10 * FIFTEEN_MB)) newErrors.isTotalSize = 'Total file size must not be larger than 150MB'

		return newErrors
	}

	const handleSubmit = e => {
		e.preventDefault()
		const newErrors = findFormErrors()
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
		} else {
			console.log('Form is valid')
			console.log('Upload files', form.uploadedFiles)
			//TODO: execute upload to lambda
		}
	}

	const isValid = () => Object.keys(errors).length > 0


	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Select GPX files to upload</Form.Label>
					<Form.Control type="file" multiple required
						onChange={e => setField('uploadedFiles', e.target.files)}
						isInvalid={!!isValid()} />
					<Form.Control.Feedback type='invalid'>
						{Object.values(errors).join(', ')}
					</Form.Control.Feedback>
				</Form.Group>
				<Button type="submit">Upload</Button>
			</Form>
		</>
	)
}