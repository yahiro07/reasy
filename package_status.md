There are problems on package distribution via JSR.

|registry|package|url|Deno|Node.js|
|:--:|:--:|:--:|:--:|:--:|
|deno.land/x|preact_reasy|https://deno.land/x/preact_reasy|OK|--|
|JSR|preact_reasy|https://jsr.io/@yahiro/preact-reasy|NG(*1)|?|
|JSR|react_reasy|https://jsr.io/@yahiro/react-reasy|?|NG(*2)|

(*1)
Cannot use from project with Deno+Fresh. Investigation required.

(*2)
Types are not valid. String mapped types are not converted as expected.
