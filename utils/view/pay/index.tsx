import React, {useEffect} from 'react'
import Head from 'next/head'
import {HeaderTitle} from '../../components/HeaderTitle/HeaderTitle'
import {useRouter} from 'next/router'
import {showMessage} from '../../components/Message/Message'
import {useStoreModel} from '../../ModelAction/useStore'
import {orderDetailModel} from '../me/orderDetail/orderDetail'
import {dealMoney} from '../../tools/utils'
import {OrderState} from '../../ss_common/enum'

const applicationId = process.env.NODE_ENV === 'production' ? 'sq0idp-IAEwX77Hdunl5dWByHQjIQ' : 'sandbox-sq0idb-42FQ7wGBwzibToRM9_zdFw'
// const applicationId = 'sq0idp-IAEwX77Hdunl5dWByHQjIQ'

export const Pay = () => {
  const router = useRouter()
  const orderId = (router.query?.orderId as string) ?? ''

  const {state: stateOD, actions: actionsOD} = useStoreModel(orderDetailModel)
  const orderInfo = stateOD.orderInfo

  useEffect(() => {
    if (orderId) {
      actionsOD.getDetail(`${orderId}`)
    }
  }, [orderId])

  useEffect(() => {
    // @ts-ignore
    if (SqPaymentForm && orderInfo.actuallyPaid) {
      // @ts-ignore
      const paymentForm = new SqPaymentForm({
        // Initialize the payment form elements
        applicationId,
        inputClass: 'sq-input',
        autoBuild: false,
        // Customize the CSS for SqPaymentForm iframe elements
        inputStyles: [{
          fontSize: '16px',
          lineHeight: '24px',
          padding: '16px',
          placeholderColor: '#a0a0a0',
          backgroundColor: 'transparent',
        }],
        // Initialize the credit card placeholders
        cardNumber: {
          elementId: 'sq-card-number',
          placeholder: 'Card Number',
        },
        cvv: {
          elementId: 'sq-cvv',
          placeholder: 'CVV',
        },
        expirationDate: {
          elementId: 'sq-expiration-date',
          placeholder: 'MM/YY',
        },
        postalCode: {
          elementId: 'sq-postal-code',
          placeholder: 'Postal',
        },
        // SqPaymentForm callback functions
        callbacks: {
          /*
          * callback function: cardNonceResponseReceived
          * Triggered when: SqPaymentForm completes a card nonce request
          */
          cardNonceResponseReceived: function (errors: any, nonce: any, cardData: any) {
            if (errors) {
              // Log errors from nonce generation to the browser developer console.
              console.error('Encountered errors:')
              errors.forEach(function (error: any) {
                console.error('  ' + error.message)
              })
              showMessage('Encountered errors, check browser developer console for more details')
              return
            }
            // alert(`The generated nonce is:\n${nonce}`)
            fetch(`/pay/process-payment`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                nonce: nonce,
                amount: ~~((orderInfo.actuallyPaid ?? 0) * 100),
              }),
            })
                .catch(err => {
                  showMessage('Network error: ' + err)
                })
                .then((response: any) => {
                  if (!response.ok) {
                    return response.json().then((errorInfo: any) => Promise.reject(errorInfo)) //UPDATE HERE
                  }
                  return response.json() //UPDATE HERE
                })
                .then(data => {
                  // console.log(data) //UPDATE HERE
                  // showMessage('Payment complete successfully!\nCheck browser developer console for more details')
                  return actionsOD.updateOrder({
                    id: orderId,
                    state: OrderState.Paid,
                  })
                })
                .then(() => {
                  showMessage('支付成功')
                  router.replace('/cart/result')
                })
                .catch(err => {
                  console.error(err)
                  showMessage('Payment failed to complete!\nCheck browser developer console for more details')
                })
          },
        },
      })
      paymentForm.build()
      const onGetCardNonce = (event: any) => {
        // Don't submit the form until SqPaymentForm returns with a nonce
        event.preventDefault()
        // Request a nonce from the SqPaymentForm object
        paymentForm.requestCardNonce()
      }
      document.querySelector('#sq-creditcard')?.addEventListener('click', onGetCardNonce)
    }
  }, [orderInfo.actuallyPaid])

  return <div>
    <Head>
      <title>pay</title>
      <script type="text/javascript"
              src="https://js.squareup.com/v2/paymentform">
      </script>
    </Head>
    <HeaderTitle
        title={'支付'}
        backCall={() => {
          router.replace('/home')
          return true
        }}
    />
    <div id="form-container">
      <div id="sq-card-number"/>
      <div className="third"
           id="sq-expiration-date"/>
      <div className="third"
           id="sq-cvv"/>
      <div className="third"
           id="sq-postal-code"/>
      <button id="sq-creditcard"
              className="button-credit-card"
      >Pay {dealMoney(orderInfo.actuallyPaid)}
      </button>
    </div>
    <style jsx>{`
        :global(*) {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        :global(body, html) {
          background-color: #F7F8F9;
          color: #373F4A;
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: normal;
          height: 100%;
        }

        :global(button) {
          border: 0;
          font-weight: 500;
        }

        :global(fieldset) {
          margin: 0;
          padding: 0;
          border: 0;
        }

        :global(#form-container) {
          padding: 20px;
          //position: relative;
          //width: 380px;
          //margin: 0 auto;
          //top: 50%;
          //transform: translateY(-50%);
        }

        :global(.third) {
          float: left;
          width: calc((100% - 32px) / 3);
          padding: 0;
          margin: 0 16px 16px 0;
        }

        :global(.third:last-of-type) {
          margin-right: 0;
        }

        /* Define how SqPaymentForm iframes should look */
        :global(.sq-input) {
          height: 56PX;
          box-sizing: border-box;
          border: 1px solid #E0E2E3;
          background-color: white;
          border-radius: 6px;
          display: inline-block;
          -webkit-transition: border-color .2s ease-in-out;
             -moz-transition: border-color .2s ease-in-out;
                  transition: border-color .2s ease-in-out;
        }

        /* Define how SqPaymentForm iframes should look when they have focus */
        :global(.sq-input--focus) {
          border: 1px solid #4A90E2;
        }

        /* Define how SqPaymentForm iframes should look when they contain invalid values */
        :global(.sq-input--error) {
          border: 1px solid #E02F2F;
        }

        :global(#sq-card-number) {
          margin-bottom: 16px;
        }

        /* Customize the "Pay with Credit Card" button */
        :global(.button-credit-card) {
          width: 100%;
          height: 56px;
          margin-top: 10px;
          background: #4A90E2;
          border-radius: 6px;
          cursor: pointer;
          display: block;
          color: #FFFFFF;
          font-size: 16px;
          line-height: 24px;
          font-weight: 700;
          letter-spacing: 0;
          text-align: center;
          -webkit-transition: background .2s ease-in-out;
             -moz-transition: background .2s ease-in-out;
                  transition: background .2s ease-in-out;
        }

        :global(.button-credit-card:hover) {
          background-color: #4281CB;
        }
    `}</style>
  </div>
}
