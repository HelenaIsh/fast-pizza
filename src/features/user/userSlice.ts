import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

interface Position {
  latitude: number;
  longitude: number;
}

function getPosition(): Promise<any> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

interface UserState {
  username: string;
  status: 'idle' | 'loading' | 'error';
  position: Position | null;
  address: string;
  error: string;
}

const initialState: UserState = {
  username: '',
  status: 'idle',
  position: null,
  address: '',
  error: '',
};

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    console.log('Fetching position...');
    const positionObj = await getPosition();
    console.log('Position obtained:', positionObj);

    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };
    console.log('Formatted position:', position);

    const addressObj = await getAddress(position);
    console.log('Address object:', addressObj);

    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
    console.log('Formatted address:', address);

    return { position, address };
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
      builder
        .addCase(fetchAddress.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAddress.fulfilled, (state, action) => {
          console.log(action);

          state.status = 'idle';
          state.position = action.payload.position;
          state.address = action.payload.address;
          state.error = '';
        })
        .addCase(fetchAddress.rejected, (state, action) => {
          state.status = 'error';
          state.error = action.error.message || 'Failed to fetch address';
        }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
