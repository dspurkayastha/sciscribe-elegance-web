const vcard =
    [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:Purkayastha;Debaraj Shome;;Dr.;MBBS\\, MS',
        'FN:Dr. Debaraj Shome Purkayastha, MBBS, MS',
        'ORG:SciScribe Solutions',
        'TITLE:Director',
        'TEL;TYPE=WORK,VOICE:+919395582679',
        'EMAIL;TYPE=WORK:contact@sciscribesolutions.com',
        'URL:https://sciscribesolutions.com',
        'END:VCARD',
    ].join('\r\n') + '\r\n';

export function GET() {
    return new Response(vcard, {
        headers: {
            'Content-Type': 'text/vcard; charset=utf-8',
            'Content-Disposition': 'inline; filename="SciScribe.vcf"',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
