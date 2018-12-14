#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate serde_json;

mod user;

define_zome! {
    entries: []

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

