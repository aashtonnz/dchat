#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate serde_json;
#[macro_use]
extern crate holochain_core_types_derive;
extern crate chrono;

mod user;

define_zome! {
    entries: [
        user::user_definition()
    ]

    genesis: || { Ok(()) }

    functions: {
        main (Public) { 
            create_user: {
                inputs: |id: String, name: String|,
                outputs: |result: JsonString|,
                handler: user::handle_create_user
            }
        }
    }
}

