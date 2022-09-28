import {defineConfig} from "cypress";
import path, {join} from "path";
import fs from "fs";
import {JSONFile, Low} from "lowdb";
import axios from "axios";
import {privateRequest, publicRequest} from "@services/axios";

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:3000",
        setupNodeEvents(on, config) {
            require("cypress-localstorage-commands/plugin")(on, config);

            on('task', {
                "db:seed"() {

                    try {
                        publicRequest.post('/seed/reset', {}, {
                            headers: {
                                // @ts-ignore
                                "seed_secret_token": process.env.NEXT_PUBLIC_SEED_SECRET_TOKEN,
                            }
                        }).then(r => console.log(r))
                    } catch (e) {
                        console.log(e)
                    }

                    return null
                },
            })

            return config;
        },


    },
});