# Invoice Data

So this is really just for local/demo purposes. It's a disposable docker container with the sole mission of loading data into mongo and then disappearing.

There's a generator JS file that was just a one-off to build a separate collection for campaigns from the initial line-item data-set.

Once both are loaded, two collections will be available - campaigns, and items. Because we're local, mongo's running without auth so point your favorite DB viewer like [robo3t]() at http://localhost:27017 and poke around.