let isConfigUpdate = false;
let reader = new FileReader();

let credentialRequest = {
    accressKeyId: 'AKIA6ODU62FEEIMNAABS',
    secretAccessKey: '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',
    signatureVersion: 'v4',
    region: 'us-east-1',
    Bucket: 'full-stack-lab'
};

async function uploadToS3Bucket(stream, credential, fileKey, cd) {
    try {
        if (!window.AWS) {
            return;
        }
        if (!isConfigUpdate) {
            window.AWS.config.update({ region: credential.region });
            isConfigUpdate = true;
        }
        let s3 = new window.AWS.S3({
            credentials: new window.AWS.Credentials({
                apiVersion: 'latest',
                accessKeyId: credential.accressKeyId,
                secretAccessKey: credential.secretAccessKey,
                signatureVersion: credential.signatureVersion,
                region: credential.region,
                Bucket: credential.Bucket
            })
        });
        let uploadItem = await s3.upload({
            Bucket: credential.Bucket,
            Key: fileKey, // using file name as the key
            ContentType: document.getElementById("fileToUpload").files[0].type,
            Body: stream
        }).on("httpUploadProgress", function (progress) {
            console.log("progress =>", progress);
            cd(getUploadingProgress(progress.loaded, progress.total));
        }).promise();
        console.log("uploadItem =>", uploadItem);
        return uploadItem;
    } catch (error) {
        console.log(error);
    }
}

function getUploadingProgress(uploadSize, totalSize) {
    let uploadProgress = (uploadSize / totalSize) * 100;
    return Number(uploadProgress.toFixed(0));
}

async function uploadMedia() {
    const fileInput = document.getElementById("fileToUpload");
    if (fileInput.files.length === 0) {
        console.log("No file selected.");
        return;
    }
    const file = fileInput.files[0];

    console.log("File name:", file.name);

    let mediaStreamRequest = getFile(file);
    const [mediaStream] = await Promise.all([mediaStreamRequest]);

    await uploadToS3Bucket(mediaStream, credentialRequest, file.name, (progress) => {
        console.log("Upload Progress:", progress);
    });
}

async function getFile(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result);
        };
        reader.onerror = (err) => {
            reject(false);
        };
        reader.readAsArrayBuffer(file);
    });
}

async function listS3Objects() {
    if (!window.AWS) {
        console.log("AWS SDK not found.");
        return;
    }
    if (!isConfigUpdate) {
        window.AWS.config.update({ region: credentialRequest.region });
        isConfigUpdate = true;
    }

    let s3 = new window.AWS.S3({
        credentials: new window.AWS.Credentials({
            apiVersion: 'latest',
            accessKeyId: credentialRequest.accressKeyId,
            secretAccessKey: credentialRequest.secretAccessKey,
            signatureVersion: credentialRequest.signatureVersion,
            region: credentialRequest.region,
            Bucket: credentialRequest.Bucket
        })
    });

    s3.listObjectsV2({ Bucket: credentialRequest.Bucket }, function (err, data) {
        if (err) {
            console.log("Error listing objects:", err);
        } else {
            console.log("S3 Bucket Objects:", data);
            // Optionally, you can iterate over data.Contents to get individual objects
            data.Contents.forEach((item) => {
                console.log("Object Key:", item.Key, " | Size:", item.Size);
            });
        }
    });
}