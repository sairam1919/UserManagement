import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { FormControl, Select, InputLabel, TextField } from '@material-ui/core';

export const StepOne = ({isEditUser, options, values,handleChange}) => {
    return (
        <DialogContent>
        <DialogContentText style={{ textAlign: 'center' }} >
            {!isEditUser ? < TextField
                label="User Name"
                placeholder="Enter User Name (Required Field)"
                fullWidth
                margin="normal"
                InputLabelProps={
                    {
                        shrink: true,
                    }
                }
                variant="outlined"
                name="UserName"
                onChange={handleChange}
                error={!values.UserName}
                values={values.UserName}
            /> : ''}
            < TextField
                label="Mobile Number"
                placeholder="Enter Mobile Number (Required Field)"
                fullWidth
                margin="normal"
                InputLabelProps={
                    {
                        shrink: true,
                    }
                }
                variant="outlined"
                name="MobileNo"
                onChange={handleChange}
                error={!values.MobileNo}
                value={values.MobileNo}
            />
            <TextField
                label="First Name"
                placeholder="Enter First Name (Required Field)"
                fullWidth
                margin="normal"
                InputLabelProps={
                    {
                        shrink: true,
                    }
                }
                variant="outlined"
                name="first_name"
                onChange={handleChange}
                error={!values.first_name}
                value={values.first_name}

            />
            <TextField
                label="Last Name"
                placeholder="Enter Last Name (Required Field)"
                fullWidth
                margin="normal"
                InputLabelProps={
                    {
                        shrink: true,
                    }
                }
                variant="outlined"
                name="last_name"
                onChange={handleChange}
                error={!values.last_name}
                value={values.last_name}

            />
            <TextField
                label="RF ID Number"
                placeholder="Enter RF ID (Required Field)"
                fullWidth
                margin="normal"
                InputLabelProps={
                    {
                        shrink: true,
                    }
                }
                variant="outlined"
                name="id_code"
                onChange={handleChange}
                error={!values.id_code}
                value={values.id_code}
            />
            <FormControl variant="outlined" fullWidth >
                <InputLabel id="role-select-outlined-label" > Role </InputLabel>
                <Select style={{ textAlign: 'left' }}
                    fullWidth
                    label="Role"
                    inputProps={
                        {
                            shrink: true,
                        }
                    }
                    placeholder="Select Role"
                    variant="outlined"
                    name="role"
                    onChange={handleChange}
                    value={values.role}
                    error={!values.role}
                >
                    {
                        options.map(option => (
                            <option value={option.value} > { option.label} </option>
                        ))}
                </Select>
            </FormControl>
        </DialogContentText>
    </DialogContent>
    )
}