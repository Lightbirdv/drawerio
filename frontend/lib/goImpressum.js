import axios from 'axios';
import Router from 'next/router';
import {confirmHash} from '../lib/confirmHash'

export const goImpressum = () => {
      Router.push("impressum");
}