import config from "../config"

export default function FindProduct() {
    return (
        <></>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const id = params.id

    if (!id) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    } else {
        const response = await fetch(`${process.env.BASE_URL}/api/products/redirect?id=${id}`)
        const json = await response.json()
        if (json.ok) {
            if (json?.data?.affiliateLink) {
                return {
                    redirect: {
                        permanent: false,
                        destination: json.data.affiliateLink
                    }
                }
            } else {
                return {
                    redirect: {
                        permanent: false,
                        destination: "/"
                    }
                }
            }
        } else {
            return {
                redirect: {
                    permanent: false,
                    destination: "/"
                }
            }
        }
    }

    return {
        props: {}
    }
}
