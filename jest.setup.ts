import { AUTH_DATA } from '@/store/auth';
import { EVENT } from '@/store/event';
import '@testing-library/jest-dom';
import * as navigation from 'next/navigation';

jest.mock('next/navigation');

(navigation.useParams as jest.Mock).mockReturnValue({id: EVENT.data.id})
jest.mock('next/image')

jest.mock('@mui/material',()=>({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: jest.fn().mockReturnValue(true), // Mocking useMediaQuery to return true by default
}))

jest.mock('@/context/auth.context',()=>({
    __esModule: true, // This is important for ES modules
    ...jest.requireActual('@/context/auth.context'),
    useAuth: jest.fn().mockReturnValue({
        authData: AUTH_DATA.data,
    })
}))

jest.mock('@mui/material/useMediaQuery',()=>({
    __esModule: true, // This is important for ES modules
    default: jest.fn().mockReturnValue(true), // Mocking useMediaQuery to return true by default
}))

